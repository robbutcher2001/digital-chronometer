import { FC } from "react";
import "./index.css";

const Tips: FC = () => (
  <div className="tips" data-testid="tips">
    <h1>Control Tips</h1>
    <aside>
      <div>
        <h2>Setting a Timer</h2>
        <ul>
          <li>Hit 'e' on the keyboard</li>
          <li>Click the timer's digits</li>
        </ul>
      </div>
      <div>
        <h2>Start/Stop a Timer</h2>
        <ul>
          <li>Hit the space bar to toggle</li>
          <li>Toggle with green/red buttons</li>
        </ul>
      </div>
      <div>
        <h2>Share Link at Current Time</h2>
        <ul>
          <li>Hit the share icon top-right!</li>
        </ul>
      </div>
    </aside>
  </div>
);

export default Tips;
