import React, { useContext } from 'react';
import './ResultOptionsDropdown.scss';
import { SearchParamsContext } from '../../Logs/SearchParams.reducer';
import {
  Popover,
  Button,
  FormLabel,
  FormInput,
  FormItem,
  FormFieldset,
} from 'fundamental-react';

export default function ResultOptionsDropdown() {
  const [state, actions] = useContext(SearchParamsContext);

  const PopoverContent = () => (
    <FormFieldset id="result-options">
      <FormItem className="fd-has-margin-small">
        <FormInput
          type="checkbox"
          id="health-checks"
          defaultChecked={state.showHealthChecks}
          onChange={e => actions.setShowHealthChecks(e.target.checked)}
        />
        <FormLabel
          className="caption-muted fd-has-margin-left-tiny"
          htmlFor="health-checks"
        >
          health checks
        </FormLabel>
      </FormItem>
    </FormFieldset>
  );

  return (
    <span className="link-button fd-has-type-minus-1">
      <Popover
        body={<PopoverContent />}
        control={
          <Button
            glyph="action-settings"
            option="transparent"
            className="fd-has-margin-right-tiny"
            size="xs"
          ></Button>
        }
        placement="bottom-end"
      />
    </span>
  );
}
