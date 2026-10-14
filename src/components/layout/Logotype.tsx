import { Link } from "react-router-dom";

type LogotypePropsConfig = {
  type: "link" | "text";
  text: string;
};

export function Logotype(props: LogotypePropsConfig) {
  return (
    <>
      {props.type === "link" && (
        <Link to="/" className="flex items-center gap-3">
          <img
            src="/logo/sizes/vaultapass_250x205.png"
            alt="VaultaPass"
            className="h-8 w-auto"
          />

          <span className="font-mono text-sm text-text uppercase">
            {props.text}
          </span>
        </Link>
      )}

      {props.type === "text" && (
        <div className="flex items-center gap-3">
          <img
            src="/logo/sizes/vaultapass_250x205.png"
            alt="VaultaPass"
            className="h-8 w-auto object-contain"
          />

          <span>{props.text}</span>
        </div>
      )}
    </>
  );
}
