/* eslint-disable react/prop-types */

function GetAddressCard(props) {
  return (
    <>
      <div>{props.addressline1}</div>
      <div>{props.addressline2}</div>
      <div>{props.city}</div>
      <div>{props.county}</div>
      <div>{props.code}</div>
      <button
        onClick={() =>
          props.getAddress(
            props.addressline1,
            props.addressline2,
            props.city,
            props.county,
            props.code
          )
        }>
        Select
      </button>
    </>
  );
}

export { GetAddressCard };
