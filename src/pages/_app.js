import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import WorkHours from "./workHours"; // WorkHours コンポーネントをインポートします

function App() {
  return (
    <Router>
      <Switch>
        <Route
          path="/workHours/:workplaceId/:employeeId"
          component={WorkHours}
        />
        {/* 他のルート定義 */}
      </Switch>
    </Router>
  );
}

export default App;
