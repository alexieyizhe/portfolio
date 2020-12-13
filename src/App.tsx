import { h, FunctionalComponent } from 'preact';
import { styled } from 'goober';


interface Props {}

const Text = styled('div')`
  color: lightblue;
`;

const App: FunctionalComponent<Props> = () => (
  <div>
    <Text color={'blue'}>Home</Text>
    <p>This is the App.</p>
  </div>
);

export default App;