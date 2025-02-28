import classNames from "classnames";
import { useDocsContext } from "../docs-context/useDocsContext";
import { HeaderButton } from "./HeaderButton";

export const Header: React.FC = () => {
    const { resolveFile, docsDefinition } = useDocsContext();

    return (
        <div
            className={classNames(
                "flex justify-between items-center gap-10 shrink-0 py-4 pl-4 pr-20 border-b border-border",
                // this matches with the calc() in the EndpointContent examples section
                "h-16"
            )}
        >
            <div className="flex max-h-full">
                {docsDefinition.config.logo != null && (
                    <div className="flex items-center">
                        <img className="max-h-5" src={resolveFile(docsDefinition.config.logo)} />
                    </div>
                )}
            </div>
            <div className="flex items-center gap-5">
                {docsDefinition.config.navbarLinks.map((navbarLink, i) => (
                    <HeaderButton key={i} navbarLink={navbarLink} />
                ))}
            </div>
        </div>
    );
};
