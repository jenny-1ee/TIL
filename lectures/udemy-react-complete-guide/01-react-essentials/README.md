# 01-react-essentials

## 🧩 jsx란?

- jsx는 JavaScript에 HTML을 섞어쓸 수 있는 확장 문법입니다.
- 브라우저는 .jsx 파일을 해석할 수 없기 때문에, 빌드 과정에서 일반 자바스크립트로 변환 됩니다.

## ⚙️ 리액트에서 컴포넌트로 인식 되기 위한 두 가지 규칙

리액트는 특정 조건을 만족하는 함수를 컴포넌트로 인식합니다:

- 함수 이름은 반드시 대문자로 시작해야 합니다. (내장 컴포넌트와 충돌하는 것을 방지)
- 렌더링 가능한 값을 반환해야 합니다. (주로 JSX 형식의 HTML 마크업)

```js
// App.js

function Header() {
  return (
    <header>
      <img src="src/assets/react-core-concepts.png" alt="Stylized atom" />
      <h1>React Essentials</h1>
      <p>
        Fundamental React concepts you will need for almost any app you are
        going to build!
      </p>
    </header>
  );
}

function App() {
  return (
    <div>
      <main>
        <Header />
        <h2>Time to get started!</h2>
      </main>
    </div>
  );
}

export default App;
```

## 🔁 리액트의 컴포넌트 처리 과정

리액트 앱은 브라우저에서 다음과 같은 흐름으로 동작합니다:

#### 📄 index.html

```html
<body>
  <div id="root"></div>
  <script type="module" src="/src/index.jsx"></script>
</body>
```

`id="root"` 인 `<div>`가 리액트 앱이 삽입 될 엔트리 포인트입니다.

#### 📦 index.jsx

```js
import ReactDOM from "react-dom/client";

import App from "./App.jsx";
import "./index.css";

const entryPoint = document.getElementById("root");
ReactDOM.createRoot(entryPoint).render(<App />);
```

`ReactDOM.createRoot(...).render(<App />)` 을 통해 `<App />` 컴포넌트가 브라우저에 렌더링 됩니다.

#### 🧱 App.jsx

```js
function Header() {
  return (
    <header>
      <img src="src/assets/react-core-concepts.png" alt="Stylized atom" />
      <h1>React Essentials</h1>
      <p>
        Fundamental React concepts you will need for almost any app you are
        going to build!
      </p>
    </header>
  );
}

function App() {
  return (
    <div>
      <main>
        <Header />
        <h2>Time to get started!</h2>
      </main>
    </div>
  );
}

export default App;
```

- `App`컴포넌트는 최상위 컴포넌트이며, 내부에 `Header` 컴포넌트를 포함하고 있습니다.
- 이 구조는 리액트 앱의 가장 기본적인 트리 형태를 보여주고 있습니다.

## 🧠 동적인 값을 JSX에서 사용하는 방법

JSX 안에 중괄호`{}`를 사용해 JavaScript 표현식을 삽입합니다.

동적인 값은 태그 속성이나 태그 내부 콘텐츠로 사용할 수 있습니다.

#### 🧱 App.jsx

```js
import reactImg from "./assets/react-core-concepts.png";

const reactDescriptions = ["Fundamental", "Crucial", "Chore"];

function getRandomInt(max) {
  return Math.floor(Math.random() * (max + 1));
}

function Header() {
  const description = reactDescriptions[getRandomInt(2)];

  return (
    <header>
      <img src={reactImg} alt="Stylized atom" />
      <h1>React Essentials</h1>
      <p>
        {description} React concepts you will need for almost any app you are
        going to build!
      </p>
    </header>
  );
}
```

## 🧠 컴포넌트 재사용 (중요)

리액트는 반복되는 UI 구조를 컴포넌트화 하고

props를 통해 데이터를 전달함으로써 유지보수와 재사용성을 높입니다.

### 🧩 props란?

- props는 **키-값의 쌍을 가진 객체**

- 상위 컴포넌트에서 하위 컴포넌트로 데이터를 전달하는 수단

```js
function CoreConcepts(props) {
  return (
    <li>
      <img src={props.image} alt={props.title} />
      <h3>{props.title}</h3>
      <p>{props.description}</p>
    </li>
  );
}
```

### 🔁 구조 분해 할당을 사용한 리팩토링

```js
function CoreConcepts({ image, title, description }) {
  return (
    <li>
      <img src={image} alt={title} />
      <h3>{title}</h3>
      <p>{description}</p>
    </li>
  );
}
```

### 🗂️ 컴포넌트 및 파일 구조 분리

프로젝트 규모가 커질수록 파일을 역할 별로 나누는 것이 중요합니다.

```js
import { CORE_CONCEPTS } from "./data.js";
import Header from "./components/Header.jsx";
import CoreConcepts from "./components/CoreConcept.jsx";

function App() {
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
      </main>
    </div>
  );
}

export default App;
```

## 🧠 props로 함수 전달하기

```js
<button onClick={handleClick}>{props.children}</button>
```

❌ `onClick={handleClick()}`: 함수가 컴포넌트 렌더링 시점에 바로 실행됩니다.

✅ `onClick={handleClick}`: 함수 **참조(포인터)** 를 전달해야 클릭 시점에 함수가 실행됩니다.

익명함수를 사용할 수도 있습니다:

- 매개변수를 넘길 때
- 여러 코드를 묶을 때

```js
<TabButton onSelect={() => handleSelect}>Components</TabButton>
```

## 🧩 props.children이란?

props.children은 컴포넌트 태그 사이의 컨텐츠를 자동으로 전달합니다.

```js
<TabButton>Components</TabButton>
```

```js
<button>{props.children}</button>
```

## 🧠 상태 관리: useState

❌ 일반 변수로는 UI를 업데이트할 수 없습니다.

- 함수가 처음 실행되고 난 후에 UI가 렌더링 되는데, 일반적인 변수는 상태 변화 감지 대상이 아닙니다.

```js
function App() {
  let tabContent = "Please click a button";

  function handleSelect(selectedButton) {
    // selectedButton => 'components', 'jsx', 'props', 'state'
    tabContent = selectedButton;
    console.log(selectedButton);
  }
```

✅ 그래서 리액트는 상태를 사용합니다.

```js
const [selectedTopic, setSelectedTopic] = useState("Please click a button");

function handleSelect(selectedButton) {
  setSelectedTopic(selectedButton);
  // console.log(selectedTopic);
}
```

- 상태를 선언할 때, 컴포넌트가 렌더링 될 초기값을 지정합니다.
- `setSelectedTopic` 함수는 다음 렌더링에서 최신 값으로 반영됩니다.

## 🧠 React Hook 규칙

- 컴포넌트 함수의 최상단에서만 호출합니다.
- 조건문, 반복문 안에는 사용할 수 없습니다.
- 컴포넌트 함수 또는 커스텀 Hook안에서 사용 가능합니다.

## 📌 조건적으로 컨텐츠를 렌더링하는 방법 4가지

#### 1️⃣ 삼항 연산자-1

```js
{
  !selectedTopic ? <p>Please select a topic.</p> : null;
}
{
  selectedTopic ? <div id="tab-content">...</div> : null;
}
```

#### 2️⃣ 삼항 연산자-2

```js
{
  !selectedTopic ? (
    <p>Please select a topic.</p>
  ) : (
    <div id="tab-content">...</div>
  );
}
```

##### 3️⃣ 논리 연산자(&&)

```js
{
  !selectedTopic && <p>Please select a topic.</p>;
}
{
  selectedTopic && <div id="tab-content">...</div>;
}
```

#### 4️⃣ 조건 분기

```js
let tabContent = <p>Please select a topic.</p>;

if (selectedTopic) {
  tabContent = <div id="tab-content">...</div>;
}

return (
  //...

  { tabContent }
);
```

## 🎨 동적 스타일링

조건에 따라 클래스를 부여하여 동적으로 스타일링할 수도 있습니다.

#### 🧱 TabButton.jsx

```js
export default function TabButton({ children, onSelect, isSelected }) {
  return (
    <li>
      <button className={isSelected ? "active" : undefined} onClick={onSelect}>
        {children}
      </button>
    </li>
  );
}
```

#### 📦 App.jsx

```js
<TabButton
  isSelected={selectedTopic === "components"}
  onSelect={() => handleSelect("components")}
>
  Components
</TabButton>
```

### 🔁 리스트를 동적으로 렌더링 하기

`map()` 함수를 사용해 데이터를 동적으로 렌더링할 수 있습니다.

```js
<ul>
  {CORE_CONCEPTS.map((conceptItem) => (
    <CoreConcepts key={conceptItem.title} {...conceptItem} />
  ))}
</ul>
```
