const Toggle = ({ state, setState }) => {
  return (
    <div className="toggle">
      <span className="toggle__title">Lista</span>
      <label className="switch">
      <input
        type="checkbox"
        name="list"
        id="list"
        onClick={() => setState(!state)}
      />
      <span className="slider round"></span>
      </label>
      <span className="toggle__title">Cartas</span>
    </div>
  )
}

export default Toggle