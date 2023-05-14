import logo from './logo.svg';
import './App.css';
import Header from './Components/header'
import NavBar from './Components/NavBar';
import Graph1 from './Components/Graph1';
import PieChart from './Components/PieChart';
import LineGraph from './Components/Line';
import SubPlot from './Components/SubPlot';
import { StackedBars } from './Components/StackedBars';

function App() {
  return (
   <div className='w-screen'>
    <Header/>
    {/* <NavBar/> */}
    <Graph1/>
    <PieChart/>
    <LineGraph/>
    <SubPlot/>
    <StackedBars/>
   </div>
  );
}

export default App;
