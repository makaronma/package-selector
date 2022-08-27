import CommandDisplay from './components/CommandDisplay';
import InputArea from './components/InputArea';
import PackageSelectSection from './components/PackageSelectSection';

// TODO: add 'ignore action type'
// TODO: add a button to set same choice for all row

const App = () => {
  return (
    <div className="min-h-screen w-screen bg-sky-100 p-6">
      <h1 className="text-3xl font-bold">Package Selector</h1>
      <InputArea />
      <PackageSelectSection />
      <CommandDisplay />
    </div>
  );
};

export default App;


