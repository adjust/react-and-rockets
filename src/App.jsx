import { RocketsList } from './solutions/task_2';

const FILTER_PARAMS = {
  year: 2018,
  customerName: 'NASA',
};

export const App = () => <RocketsList filterParams={FILTER_PARAMS} />;
