import './css/App.css'
import RootRoute from './RootRoute'

// Toast관련 라이브러리
import 'react-toastify/dist/ReactToastify.css'; // Toast를 제대로 사용하기 위한 css 파일
import { ToastContainer, toast } from 'react-toastify';     // 토스트 메시지 Container
// Persist 관련 Library
// persistStore를 사용하여 store를 persistor로 사용하기 위해 인스턴스화 합니다.
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
// import { loadInitialData } from 'redux/actions';

// Redux Store Provider
import { Provider, useDispatch } from 'react-redux';
import store from 'Reducer/store';

// 변수
const persistor = persistStore(store);

<link href="https://hangeul.pstatic.net/hangeul_static/css/maru-buri.css" rel="stylesheet"></link>

function App() {

  return (
    <div className="App" style={{fontFamily : 'MaruBuriExtraLight'}}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RootRoute />
        </PersistGate>
      </Provider>
       
      <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      closeOnClick={true}
      pauseOnHover={true}
      draggable={true}
      progress={undefined}
      />
    </div>
  );
}

export default App;
