/* eslint-disable react/prop-types */
import classes from "./checkout.module.css";

function GetAddressCard(props) {
  return (
    <div className={classes.container}>
      {props.addressline1 && (
        <input
          type="text"
          defaultValue={`${props.addressline1}`}
          readOnly
          disabled={true}
        />
      )}
      {props.addressline2 && (
        <input
          type="text"
          defaultValue={`${props.addressline2}`}
          readOnly
          disabled={true}
        />
      )}
      {props.city && (
        <input
          type="text"
          defaultValue={`${props.city}`}
          readOnly
          disabled={true}
        />
      )}
      {props.county && (
        <input
          type="text"
          defaultValue={`${props.county}`}
          readOnly
          disabled={true}
        />
      )}
      {props.code && (
        <input
          type="text"
          defaultValue={`${props.code}`}
          readOnly
          disabled={true}
        />
      )}

      <button
        onClick={() =>
          props.getAddress(
            props.addressline1,
            props.addressline2,
            props.city,
            props.county,
            props.code
          )
        }
        className={classes.btn}
      >
        Select
      </button>
    </div>
  );
}

export { GetAddressCard };
