import './template1.css';
function Template1(props: any) {
  return (
    <>
      <div className='template-container'>
        <div className='log-div'>
          <img
            src='https://www.ocean-energy.no/wp-content/uploads/2017/03/logo-main-dummy-hd.png'
            alt='energy-logo.png'
          />
          <h1>Invoice - 11236</h1>
        </div>
        <div className='subject'>
          Thank you for partnering with us. Please find the details of bills
          below.
        </div>
        <div className='description'>
          <p>
            <strong>
              Hi, {props.name.toUpperCase()} {props.lastName.toUpperCase()}
            </strong>
            <br />
            <br />
            Thank you for opting for a fixed-amount plan. Your energy bill for
            the month of /month/,/year/ is Rs /fixed amount//- only. Kindly pay
            in time to avoid penalty charges or disconnection.
            <br />
          </p>
          <strong>Regards,</strong>
          <br />
          <strong>Corporation name</strong>
        </div>
      </div>
    </>
  );
}
export default Template1;
