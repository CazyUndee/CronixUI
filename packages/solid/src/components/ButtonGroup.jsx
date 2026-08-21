export function ButtonGroup(props) {
  return (
    <div class={`cn-btn-group ${props.className || ''}`}>
      {props.children}
    </div>
  );
}
