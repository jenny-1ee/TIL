import { CORE_CONCEPTS } from "./data.js";
import Header from "./components/Header/Header.jsx";
import CoreConcepts from "./components/CoreConcept.jsx";
import TabButton from "./components/TabButton.jsx";

  function handleSelect(selectedButton) {
    // selectedButton => 'components', 'jsx', 'props', 'state'

    console.log(selectedButton);
  }

  return (
    <div>
      <main>
        <Header />
        <section id="core-concepts">
          <h2>Core Concepts</h2>
          <ul>
            <CoreConcepts {...CORE_CONCEPTS[0]} />
            <CoreConcepts {...CORE_CONCEPTS[1]} />
            <CoreConcepts {...CORE_CONCEPTS[2]} />
            <CoreConcepts {...CORE_CONCEPTS[3]} />
          </ul>
        </section>
        <section id="examples">
          <h2>Examples</h2>
          <menu>
            <TabButton onSelect={() => handleSelect("components")}>
              Components
            </TabButton>
            <TabButton onSelect={() => handleSelect("jsx")}>JSX</TabButton>
            <TabButton onSelect={() => handleSelect("props")}>Props</TabButton>
            <TabButton onSelect={() => handleSelect("state")}>State</TabButton>
          </menu>
        </section>
        Dynamic Content
      </main>
    </div>
  );
}

export default App;
