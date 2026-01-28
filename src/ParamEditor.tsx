import React from "react";

interface Color {
  id: number;
  name: string;
}

interface State {
  paramValues: ParamValue[];
}

interface Param {
  id: number;
  name: string;
  type: string;
}

interface ParamValue {
  paramId: number;
  value: string;
}

interface Model {
  paramValues: ParamValue[];
  colors: Color[];
}

interface Props {
  params: Param[];
  model: Model;
}

export class ParamEditor extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      paramValues: props.model.paramValues,
    };
  }

  private handleParamChange = (paramId: number, value: string) => {
    this.setState((prevState) => ({
      paramValues: prevState.paramValues.map((pv) =>
        pv.paramId === paramId ? { ...pv, value } : pv,
      ),
    }));
  };

  public getModel(): Model {
    return {
      paramValues: this.state.paramValues,
      colors: this.props.model.colors,
    };
  }

  render() {
    return (
      <div style={{ padding: "20px" }}>
        {this.props.params.map((param) => {
          const currentValue =
            this.state.paramValues.find((pv) => pv.paramId === param.id)
              ?.value || "";

          return (
            <div
              key={param.id}
              style={{
                display: "flex",
                marginBottom: "10px",
                alignItems: "center",
              }}
            >
              <label style={{ width: "150px", fontWeight: "bold" }}>
                {param.name}
              </label>
              <input
                type="text"
                value={currentValue}
                onChange={(e) =>
                  this.handleParamChange(param.id, e.target.value)
                }
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  padding: "4px",
                }}
              />
            </div>
          );
        })}
      </div>
    );
  }
}

const PARAMS: Param[] = [
  { id: 1, name: "Назначение", type: "string" },
  { id: 2, name: "Длина", type: "string" },
];

const MODEL: Model = {
  paramValues: [
    { paramId: 1, value: "повседневное" },
    { paramId: 2, value: "макси" },
  ],
  colors: [],
};

export default function App() {
  const editorRef = React.useRef<ParamEditor>(null);

  const logModel = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getModel());
    }
  };

  return (
    <div>
      <ParamEditor ref={editorRef} params={PARAMS} model={MODEL} />
      <button onClick={logModel} style={{ marginTop: "20px" }}>
        Печать Model в консоль
      </button>
    </div>
  );
}
