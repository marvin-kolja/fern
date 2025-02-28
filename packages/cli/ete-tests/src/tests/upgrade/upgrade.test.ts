import { join, RelativeFilePath } from "@fern-api/fs-utils";
import { GeneratorsConfigurationSchema } from "@fern-api/generators-configuration";
import {
    DEFAULT_WORSPACE_FOLDER_NAME,
    FERN_DIRECTORY,
    GENERATORS_CONFIGURATION_FILENAME,
} from "@fern-api/project-configuration";
import { readFile, writeFile } from "fs/promises";
import yaml from "js-yaml";
import { runFernCli } from "../../utils/runFernCli";
import { init } from "../init/init";

const GENERATORS_CONFIGURATION: GeneratorsConfigurationSchema = {
    groups: {
        internal: {
            generators: [
                {
                    name: "fernapi/fern-postman",
                    version: "0.0.15",
                    output: {
                        location: "local-file-system",
                        path: "./generated-postman",
                    },
                },
                {
                    name: "fernapi/fern-openapi",
                    version: "0.0.3",
                    output: {
                        location: "local-file-system",
                        path: "./generated-openapi",
                    },
                    config: {
                        format: "yaml",
                    },
                },
                {
                    name: "fernapi/fern-java-sdk",
                    version: "0.0.50",
                    output: {
                        location: "maven",
                        coordinate: "",
                    },
                },
                {
                    name: "fernapi/fern-typescript-sdk",
                    version: "0.0.11",
                    output: {
                        location: "npm",
                        "package-name": "",
                    },
                },
            ],
        },
        external: {
            generators: [
                {
                    name: "fernapi/fern-postman",
                    version: "0.0.20",
                    output: {
                        location: "local-file-system",
                        path: "./generated-postman",
                    },
                },
                {
                    name: "fernapi/fern-openapi",
                    version: "0.0.2",
                    output: {
                        location: "local-file-system",
                        path: "./generated-openapi",
                    },
                    config: {
                        format: "yaml",
                    },
                },
                {
                    name: "fernapi/fern-java-sdk",
                    version: "0.0.81",
                    output: {
                        location: "maven",
                        coordinate: "",
                    },
                },
                {
                    name: "fernapi/fern-typescript-sdk",
                    version: "0.0.14",
                    output: {
                        location: "npm",
                        "package-name": "",
                    },
                },
            ],
        },
    },
};

describe("fern upgrade", () => {
    it("upgrades generators", async () => {
        const directory = await init();
        const generatorsConfigurationFilepath = join(
            directory,
            RelativeFilePath.of(FERN_DIRECTORY),
            RelativeFilePath.of(DEFAULT_WORSPACE_FOLDER_NAME),
            RelativeFilePath.of(GENERATORS_CONFIGURATION_FILENAME)
        );
        // make sure the file exists
        await readFile(generatorsConfigurationFilepath);
        await writeFile(generatorsConfigurationFilepath, yaml.dump(GENERATORS_CONFIGURATION));
        await runFernCli(["upgrade"], {
            cwd: directory,
            env: {
                // this env var needs to be defined so the CLI thinks we're mid-upgrade
                FERN_PRE_UPGRADE_VERSION: "0.0.0",
            },
        });
        const generatorsConfiguration = (await readFile(generatorsConfigurationFilepath)).toString();
        expect(generatorsConfiguration).toMatchSnapshot();
    }, 90_000);
});
