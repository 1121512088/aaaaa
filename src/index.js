import dva from 'dva';
import './index.css';
import './utils/fontSize';
import { createBrowserHistory as createHistory } from "history";

// 1. Initialize
const app = dva({ history: createHistory() });

// 2. Plugins
// app.use({});

// 3. Model
require('./models').default.forEach(item => app.model(item));
// app.model(require('./models').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
