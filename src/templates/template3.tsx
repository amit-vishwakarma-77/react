function Template3(props: any) {
  return (
    <>
      <h1>Template 3 </h1>
      <h3>
        Hello {props.name.first} {props.name.lastName}
      </h3>
    </>
  );
}
export default Template3;
