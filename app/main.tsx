import { createRoot } from 'react-dom/client';
import Home from './page';
import './globals.css';
import './presentation.css';
import './cover.css';

const root = document.getElementById('root');
if (!root) throw new Error('The presentation root is missing.');
createRoot(root).render(<Home />);
