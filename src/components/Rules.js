import React from "react";
import "./Rules.css"; // Make sure to create this CSS file

const Rules = () => {
  return (
    <div className="poker-rules">
      <div className="container">
        <header className="header">
          <h1>ПРАВИЛА ПОКЕРА TEXAS HOLDEM</h1>
        </header>
        
        <div className="section intro">
          <h2>Основные положения</h2>
          <p>Техасский холдем — самая популярная разновидность покера в мире. В игре используется стандартная колода из 52 карт. Каждому игроку раздаются две закрытые карты, а затем на стол выкладываются до пяти общих карт, которые могут использовать все игроки для составления своей комбинации.</p>
        </div>
        
        <div className="grid-layout">
          <div className="card">
            <h3>Структура игры</h3>
            <ul className="custom-list">
              <li>
                <span className="icon">♦</span>
                <span>Блайнды: Малый и большой блайнды — обязательные ставки, которые делают два игрока перед началом раздачи.</span>
              </li>
              <li>
                <span className="icon">♦</span>
                <span>Префлоп: Каждый игрок получает две карты (карманные карты), после чего начинается первый раунд торговли.</span>
              </li>
              <li>
                <span className="icon">♦</span>
                <span>Флоп: На стол выкладываются три общие карты, после чего идёт второй раунд торговли.</span>
              </li>
              <li>
                <span className="icon">♦</span>
                <span>Тёрн: На стол выкладывается четвёртая общая карта, после чего идёт третий раунд торговли.</span>
              </li>
              <li>
                <span className="icon">♦</span>
                <span>Ривер: На стол выкладывается пятая и последняя общая карта, после чего идёт заключительный раунд торговли.</span>
              </li>
              <li>
                <span className="icon">♦</span>
                <span>Вскрытие: Если после всех раундов торговли в игре остаётся более одного игрока, происходит вскрытие и сравнение комбинаций.</span>
              </li>
            </ul>
          </div>
          
          <div className="card">
            <h3>Возможные действия</h3>
            <ul className="custom-list">
              <li>
                <span className="icon">♥</span>
                <span><strong>Колл (Call)</strong>: Уравнивание текущей ставки.</span>
              </li>
              <li>
                <span className="icon">♥</span>
                <span><strong>Чек (Check)</strong>: Пропуск хода без ставки (возможно, когда нет текущих ставок).</span>
              </li>
              <li>
                <span className="icon">♥</span>
                <span><strong>Бет (Bet)</strong>: Первая ставка в раунде торговли.</span>
              </li>
              <li>
                <span className="icon">♥</span>
                <span><strong>Рейз (Raise)</strong>: Повышение текущей ставки.</span>
              </li>
              <li>
                <span className="icon">♥</span>
                <span><strong>Фолд (Fold)</strong>: Сброс карт и выход из раздачи.</span>
              </li>
              <li>
                <span className="icon">♥</span>
                <span><strong>Олл-ин (All-in)</strong>: Ставка всех оставшихся фишек.</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="section combinations">
          <h2>Комбинации карт (по возрастанию)</h2>
          <div className="combinations-grid">
            <div className="combination-card">
              <h4>Старшая карта</h4>
              <p>Если у игрока нет ни одной из комбинаций, то играет старшая карта.</p>
            </div>
            <div className="combination-card">
              <h4>Пара</h4>
              <p>Две карты одного достоинства.</p>
            </div>
            <div className="combination-card">
              <h4>Две пары</h4>
              <p>Две разные пары карт одного достоинства.</p>
            </div>
            <div className="combination-card">
              <h4>Сет/Тройка</h4>
              <p>Три карты одного достоинства.</p>
            </div>
            <div className="combination-card">
              <h4>Стрит</h4>
              <p>Пять карт последовательного достоинства разных мастей.</p>
            </div>
            <div className="combination-card">
              <h4>Флеш</h4>
              <p>Пять карт одной масти.</p>
            </div>
            <div className="combination-card">
              <h4>Фулл-хаус</h4>
              <p>Сочетание тройки и пары разного достоинства.</p>
            </div>
            <div className="combination-card">
              <h4>Каре</h4>
              <p>Четыре карты одного достоинства.</p>
            </div>
            <div className="combination-card">
              <h4>Стрит-флеш</h4>
              <p>Пять карт последовательного достоинства одной масти.</p>
            </div>
            <div className="combination-card">
              <h4>Роял-флеш</h4>
              <p>Стрит-флеш от десятки до туза.</p>
            </div>
          </div>
        </div>
        
        <div className="card rules-card">
          <h3>Важные правила и особенности</h3>
          <ul className="custom-list">
            <li>
              <span className="icon">♠</span>
              <span>Игрок может использовать любую комбинацию из своих двух карманных карт и пяти общих карт для составления лучшей пятикарточной комбинации.</span>
            </li>
            <li>
              <span className="icon">♠</span>
              <span>Если у нескольких игроков одинаковая комбинация, то банк делится между ними поровну (сплит).</span>
            </li>
            <li>
              <span className="icon">♠</span>
              <span>При определении победителя сначала сравнивается тип комбинации, а затем, если они одинаковы, старшинство карт, входящих в комбинацию.</span>
            </li>
            <li>
              <span className="icon">♠</span>
              <span>При игре в лимитный покер количество повышений ставки может быть ограничено (обычно до 4).</span>
            </li>
          </ul>
        </div>
        
        <footer className="footer">
          <p>© 2025 Правила покера Техасский Холдем</p>
        </footer>
      </div>
    </div>
  );
};

export default Rules;