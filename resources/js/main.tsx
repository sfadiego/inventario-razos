import 'flatpickr/dist/flatpickr.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'swiper/swiper-bundle.css';
import './index.css';

// datatable
import '@mantine/core/styles.layer.css';
import 'mantine-datatable/styles.layer.css';

import { App } from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
