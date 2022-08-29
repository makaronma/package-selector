import CommandDisplay from './components/CommandDisplay';
import InputArea from './components/InputArea';
import PackageSelectSection from './components/PackageSelectSection';
import GithubLogo from './assets/GitHub-Mark-64px.png'
// TODO: add switch terminal
// TODO: add switch yarn npm
// TODO: add latest versions display in listing
// TODO: add single package all versions display

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
          <InputArea />
          <PackageSelectSection />
          <CommandDisplay />
        </div>
      </div>
    </>
  );
};

export default App;


