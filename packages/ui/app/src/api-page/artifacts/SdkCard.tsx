import * as FernRegistryDocsRead from "@fern-fern/registry-browser/api/resources/docs/resources/v1/resources/read";
import { useMemo } from "react";
import { NodeJsLogo } from "./sdk-logos/NodeJsLogo";
import { SdkCardLayout } from "./SdkCardLayout";

export declare namespace SdkCard {
    export interface Props {
        sdk: FernRegistryDocsRead.PublishedSdk;
    }
}

interface SdkRenderInfo {
    icon: JSX.Element;
    title: string;
    githubRepo: FernRegistryDocsRead.GitHubRepo;
    packageName: string;
    version: string;
}

export const SdkCard: React.FC<SdkCard.Props> = ({ sdk }) => {
    const renderInfo = useMemo(
        () =>
            sdk._visit<SdkRenderInfo | undefined>({
                npm: (npm) => ({
                    icon: <NodeJsLogo />,
                    title: "Node.js",
                    githubRepo: npm.githubRepo,
                    packageName: npm.packageName,
                    version: npm.version,
                }),
                maven: () => undefined,
                pypi: () => undefined,
                _other: () => undefined,
            }),
        [sdk]
    );

    if (renderInfo == null) {
        return null;
    }

    return (
        <SdkCardLayout
            icon={renderInfo.icon}
            title={renderInfo.title}
            subtitle={renderInfo.githubRepo.name}
            rightElement={
                <div className="rounded-full bg-green-500/20 px-2 py-px text-green-400">v{renderInfo.version}</div>
            }
            href={renderInfo.githubRepo.url}
        />
    );
};
