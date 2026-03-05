import { Calculator, TrendingUp, Settings, CloudSun, CheckSquare } from 'lucide-react';
import CalculatorApp from './calculator/Calculator';
import StockPriceApp from './stocks/StockPrice';
import SettingsApp from './settings/Settings';
import WeatherApp from './weather/Weather';
import TodoApp from './todo/Todo';

export const plugins = [
    {
        id: 'calculator',
        name: 'Calculator',
        icon: Calculator,
        component: CalculatorApp
    },
    {
        id: 'stocks',
        name: 'Stock Market',
        icon: TrendingUp,
        component: StockPriceApp
    },
    {
        id: 'weather',
        name: 'Weather',
        icon: CloudSun,
        component: WeatherApp
    },
    {
        id: 'todo',
        name: 'Todo List',
        icon: CheckSquare,
        component: TodoApp
    },
    {
        id: 'settings',
        name: 'Settings',
        icon: Settings,
        component: SettingsApp
    }
];
