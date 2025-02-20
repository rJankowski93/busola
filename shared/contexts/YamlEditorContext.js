import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
} from 'react';
import { SideDrawer } from '../components/SideDrawer/SideDrawer';
import { Tooltip } from '../components/Tooltip/Tooltip';
import { Button } from 'fundamental-react';
import jsyaml from 'js-yaml';
import { ControlledEditor } from '@monaco-editor/react';
import LuigiClient from '@luigi-project/client';
import copyToCliboard from 'copy-to-clipboard';
import { saveAs } from 'file-saver';

export const YamlEditorContext = createContext({
  setEditedJson: _ => {},
});

const isValidYaml = yaml => {
  if (!yaml) return false;
  try {
    jsyaml.safeLoad(yaml);
    return true;
  } catch (e) {
    return false;
  }
};

const YamlContent = ({ json, setChangedYamlFn }) => {
  const [val, setVal] = useState(jsyaml.safeDump(json));

  useEffect(() => {
    const converted = jsyaml.safeDump(json);
    setChangedYamlFn(null);
    setVal(converted);
  }, [json]);

  return (
    <>
      <h1 className="fd-has-type-4">
        YAML
        <Tooltip content="Copy to clipboard" position="top">
          <Button
            option="transparent"
            glyph="copy"
            onClick={() => copyToCliboard(val)}
          />
        </Tooltip>
        <Tooltip content="Download" position="top">
          <Button
            option="transparent"
            glyph="download"
            onClick={() => {
              const blob = new Blob([val], {
                type: 'application/yaml;charset=utf-8',
              });
              saveAs(blob, 'spec.yaml');
            }}
          />
        </Tooltip>
      </h1>
      <ControlledEditor
        height="90vh"
        width="min(48vw, 150em)"
        language={'yaml'}
        theme="vs-light"
        value={val}
        onChange={(_, text) => setChangedYamlFn(text)}
      />
    </>
  );
};

export const YamlEditorProvider = ({ children }) => {
  const [json, setJson] = useState(null);
  const [isOpen, setOpen] = useState(false);
  const [changedYaml, setChangedYaml] = useState(null);
  const onSaveFn = useRef(_ => {});

  useEffect(() => {
    LuigiClient.uxManager().setDirtyStatus(false);
    json && setOpen(true);
  }, [json]);

  useEffect(() => {
    if (!isOpen) setJson(null);
  }, [isOpen]);

  useEffect(() => {
    LuigiClient.uxManager().setDirtyStatus(!!changedYaml);
  }, [changedYaml]);

  function setEditedJson(newJson, onSaveHandler) {
    onSaveFn.current = onSaveHandler;
    setJson(newJson);
  }

  async function handleSaveClick() {
    try {
      await onSaveFn.current(changedYaml);
      setOpen(false);
    } catch (_) {}
  }

  const bottomContent = (
    <>
      <Button
        className="fd-has-margin-right-small"
        glyph="accept"
        type="positive"
        option="emphasized"
        onClick={handleSaveClick}
        disabled={!isValidYaml(changedYaml)}
      >
        Save
      </Button>
      <Button glyph="cancel" type="negative" onClick={() => setOpen(!isOpen)}>
        Cancel
      </Button>
    </>
  );

  const drawerComponent = (
    <SideDrawer
      isOpen={isOpen}
      setOpen={setOpen}
      buttonText={null}
      bottomContent={bottomContent}
      hideDefaultButton={true}
    >
      <YamlContent json={json} setChangedYamlFn={setChangedYaml} />
    </SideDrawer>
  );

  return (
    <YamlEditorContext.Provider value={setEditedJson}>
      {drawerComponent}
      {children}
    </YamlEditorContext.Provider>
  );
};

export function useYamlEditor() {
  return useContext(YamlEditorContext);
}
