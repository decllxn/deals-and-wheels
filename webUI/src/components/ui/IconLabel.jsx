import React from "react";

const IconLabel = ({ icon: Icon, text }) => (
  <div className="flex items-center text-sm text-[var(--muted-text)] gap-1">
    <Icon className="w-4 h-4 text-[var(--muted-text)]" />
    <span>{text}</span>
  </div>
);

export default IconLabel;