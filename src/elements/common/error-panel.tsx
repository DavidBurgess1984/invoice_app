import React, { ChangeEvent } from "react";
import formInputMap from "@/src/form/form-input-map";

interface ErrorPanelProps {
  toShow: Array<string>;
  errors: Record<string, string>;
}

const ErrorPanel: React.FC<ErrorPanelProps> = ({ toShow, errors }) => {
  let hidePanel = true;
  toShow.forEach((errorName) => {
    if (typeof errors[errorName] !== "undefined") {
      hidePanel = false;
    }
  });

  if (hidePanel) {
    return null;
  }

  return (
    <div className="w-full flex flex-col text-delete-bg">
      <h2 className="heading-s ">Error</h2>
      {toShow.map((errorName) => {
        if (typeof errors[errorName] !== undefined) {
          return (
            <p>
              {formInputMap[errorName]["labelText"] + ": " + errors[errorName]}
            </p>
          );
        }
      })}
    </div>
  );
};

export default ErrorPanel;
