function Template1(props: any) {
  return (
    <>
      <h1>Template 1 </h1>
      <h3>
        Hello {props.name.first} {props.name.lastName}
      </h3>
    </>
  );
}
export default Template1;
