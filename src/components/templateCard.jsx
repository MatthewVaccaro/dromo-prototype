import download from "../asset/icons/download.svg";
import sheetsIcon from "../asset/icons/sheetsIcon.svg";

function TemplateCard({ headline, content, link }) {
  return (
    <div className="templateCard">
      <h2> {headline} </h2>
      <p>{content}</p>
      <div className="flexAlignCenter mt-12">
        <a href={link} target="_blank" className="linkGroup">
          <img src={download} alt="download icon" />
          <p className="blue">Download CSV</p>
        </a>
        <a href={link} target="_blank" className="linkGroup">
          <img src={sheetsIcon} alt="google sheets icon" />
          <p className="blue">View Google Sheet Template</p>
        </a>
      </div>
    </div>
  );
}

export default TemplateCard;
