import GithubLogo from "~assets/GitHub-Mark-64px.png";
import CommandDisplaySection from "~/components/CommandDisplaySection";
import DepSelectSection from "~/components/DepSelectSection";
import InputSection from "~/components/InputSection";
import ApiEndPointSelectSection from "./components/ApiEndPointSelectSection";

// TODO: add latest versions display in listing(debounce)
// TODO: fixed table header
// TODO: subtitle clickable text layout

const App = () => {

  return (
    <>
      <div className="min-h-screen bg-sky-100">
        <div className="bg-white p-4 text-2xl flex font-bold flex-row shadow-lg mb-4 justify-between">
          <h1>Package Selector</h1>
          <a href="https://github.com/makaronma/package-selector" target="_blank" rel="noreferrer">
            <img src={GithubLogo} className="h-10" alt="github-source" />
          </a>
        </div>
        <div className="px-14 pt-6 pb-24">
          <InputSection />
          <ApiEndPointSelectSection />
          <DepSelectSection />
          <CommandDisplaySection />
        </div>
      </div>
    </>
  );
};

export default App;


