import React from 'react';
import { createRoot } from 'react-dom/client';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import isoWeek from 'dayjs/plugin/isoWeek';
import { CalendarContext } from './services';
import {
  MonthView,
  ListView,
} from '@gitroom/frontend/components/launches/calendar';
import './style.scss';

dayjs.extend(utc);
dayjs.extend(isoWeek);
dayjs.locale('pt');
const integrations = [
  {
    id: 'demo-creator',
    name: 'Marina cria',
    identifier: 'instagram',
    picture: '/icons/platforms/instagram.png',
  },
  {
    id: 'demo-business',
    name: 'Café Aurora',
    identifier: 'facebook',
    picture: '/icons/platforms/facebook.png',
  },
  {
    id: 'demo-agency',
    name: 'Agência Horizonte',
    identifier: 'linkedin',
    picture: '/icons/platforms/linkedin.png',
  },
].map((item) => ({
  ...item,
  providerIdentifier: item.identifier,
  time: [],
  type: 'social',
  editor: 'normal',
}));
const posts = [
  [5, 0, 'Bastidores do meu próximo vídeo', 'Criação'],
  [7, 1, 'O café da semana chegou', 'Café Aurora'],
  [8, 2, 'Um projeto novo para compartilhar', 'Horizonte'],
  [10, 0, 'Três ideias para começar a semana', 'Criação'],
  [12, 1, 'Sábado tem encontro por aqui', 'Café Aurora'],
  [14, 2, 'O que aprendemos neste projeto', 'Horizonte'],
  [16, 0, 'Minha rotina de criação', 'Criação'],
  [18, 1, 'Do grão à sua xícara', 'Café Aurora'],
  [21, 2, 'Conheça quem faz parte da equipe', 'Horizonte'],
  [23, 0, 'Um passeio e novas referências', 'Criação'],
  [25, 1, 'Café novo na sexta-feira', 'Café Aurora'],
  [28, 2, 'Ideias para o próximo mês', 'Horizonte'],
].map(([day, profile, content, tag], index) => ({
  id: `demo-${index}`,
  group: `group-${index}`,
  content,
  publishDate: `2026-10-${String(day).padStart(2, '0')}T12:00:00Z`,
  state: index % 4 === 0 ? 'DRAFT' : 'QUEUE',
  integration: integrations[profile],
  tags: [{ tag: { name: tag, color: '#612bd3' } }],
  image: '[]',
  settings: '{}',
}));
const list = new URLSearchParams(location.search).get('view') === 'list';
const value = {
  startDate: '2026-10-01',
  endDate: '2026-10-31',
  display: list ? 'list' : 'month',
  loading: false,
  integrations,
  posts,
  listPosts: posts.slice(0, 4),
  listState: 'all',
  comments: [],
  sets: [],
  trendings: [],
  reloadCalendarView: () => {},
  changeDate: () => {},
};
createRoot(document.getElementById('root')).render(
  <DndProvider backend={HTML5Backend}>
    <CalendarContext.Provider value={value}>
      <div className="capture-frame">
        <div className="capture-heading">
          <div>
            <h1>Calendário</h1>
            <p>Outubro de 2026 · Conteúdo de demonstração</p>
          </div>
          <span>Postora</span>
        </div>
        <div className="capture-calendar">
          {list ? <ListView /> : <MonthView />}
        </div>
      </div>
    </CalendarContext.Provider>
  </DndProvider>
);
