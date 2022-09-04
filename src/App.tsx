import GithubLogo from './assets/GitHub-Mark-64px.png';
import CommandDisplaySection from './components/CommandDisplaySection';
import PackageSelectSection from './components/DepSelectSection';
import InputSection from './components/InputSection';

// TODO: add latest versions display in listing(debounce)
// TODO: fixed table header
// TODO: subtitle clickable text layout
// TODO: useReducer
// TODO: memo
// TODO: @/
// TODO: use immutable helper

const App = () => {
  return (
    <>
      <div className="min-h-screen bg-sky-100">
        <div className="bg-white p-4 text-2xl flex font-bold flex-row shadow-lg mb-4 justify-between">
          <h1>Package Selector</h1>
          <a href="https://github.com/makaronma/package-selector" target='_blank' rel="noreferrer">
            <img src={GithubLogo} className='h-10' alt="github-source" />
          </a>
        </div>
        <div className=" px-14 pt-6 pb-24">
          <InputSection />
          <PackageSelectSection />
          <CommandDisplaySection />
        </div>
      </div>
    </>
  );
};

export default App;


