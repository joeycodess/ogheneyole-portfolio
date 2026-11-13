import PropTypes from "prop-types";

export default function ArchitectureFlow({caption, steps}) {
  return (
    <figure className="architecture-flow">
      <figcaption className="label">{caption}</figcaption>
      <ol>
        {steps.map((step) => <li key={step}>{step}</li>)}
      </ol>
    </figure>
  );
}

ArchitectureFlow.propTypes = {
  caption: PropTypes.string.isRequired,
  steps: PropTypes.arrayOf(PropTypes.string).isRequired,
};
