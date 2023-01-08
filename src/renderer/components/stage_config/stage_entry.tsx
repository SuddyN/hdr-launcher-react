import React from 'react';
import { useRef } from 'react';
import { stageInfo } from 'renderer/operations/stage_info';
import { Backend } from '../../operations/backend';
import { StageConfig } from '../../operations/stage_config';
import { FocusButton } from '../buttons/focus_button';
import { FocusCheckbox } from '../buttons/focus_checkbox';

export function StageEntry(props: {
  stageName: string;
  onClick: () => Promise<void>;
  enabled: boolean;
  onFocus?: () => Promise<void>;
}) {
  const selfRef = useRef<HTMLButtonElement>(null);

  return (
    <FocusButton
      key={props.stageName}
      ref={selfRef}
      children={
        <input
          className="focus-check"
          type="checkbox"
          readOnly
          checked={props.enabled}
        />
      }
      onClick={() => {
        return props.onClick();
      }}
      className={'main-buttons smaller-main-button' + (Backend.isSwitch() ? ' no-transition' : '')}
      text={
        (stageInfo[props.stageName]
          ? stageInfo[props.stageName].display_name
          : props.stageName) + '\u00A0'
      }
      onFocus={async () => {
        if (props.onFocus !== undefined) {
          await props
            .onFocus()
            .catch((e) =>
              console.log('while handling onfocus for stage entry: ' + e)
            );
        }
        if (selfRef != null && Backend.isSwitch()) {
          let sibling = selfRef.current?.nextElementSibling;
          if (sibling !== null && sibling !== undefined) {
            if (sibling.getBoundingClientRect().top > window.innerHeight - 150) {
              sibling.scrollIntoView(false);
            }
          }

          let prev_sibling = selfRef.current?.previousElementSibling;
          if (prev_sibling !== null && prev_sibling !== undefined) {
            if (prev_sibling.getBoundingClientRect().top < 70) {
              prev_sibling.scrollIntoView(true);
            }
          }
        }
      }}
    />
  );
}
