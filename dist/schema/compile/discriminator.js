"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
const compile_1 = require("./compile");
const compileSchemaObjectPropertiesAndDiscriminator = async (properties, { propertyName, mapping }) => {
    const { content, importTypes } = await properties.reduce(async (out, property) => {
        const info = await out;
        if (property.id === propertyName) {
            return info;
        }
        const data = await compileSchemaObjectProperty(property);
        if (data) {
            return {
                importTypes: info.importTypes.concat(data.importTypes),
                content: `${info.content}
  ${data.content};`
            };
        }
        else {
            return info;
        }
    }, Promise.resolve({
        importTypes: [],
        content: ""
    }));
    const { content: mappingContent, importTypes: mappingImportTypes } = Object.keys(mapping).reduce((info, value) => {
        const importType = utils_1.parseRef(mapping[value]);
        return {
            importTypes: info.importTypes.concat([importType]),
            content: `${info.content} | 
        (
          {
            "${propertyName}": ${JSON.stringify(value)};
          } & ${importType.id}
        )`
        };
    }, {
        importTypes: [],
        content: ""
    });
    return {
        content: `{${content}} & (${mappingContent})`,
        importTypes: importTypes.concat(mappingImportTypes)
    };
};
const compileSchemaObjectProperty = async (property) => compile_1.compile(property.schema, `"${property.id}"${property.required ? "" : "?"}:`);
exports.compileSchemaDiscriminator = async (schema, id, registerId, register) => {
    const docs = utils_1.compileDocs([
        {
            key: "description",
            content: schema.description
        },
        {
            key: "example",
            content: schema.example
        },
        {
            key: "name",
            content: schema.name
        }
    ]);
    const { content, importTypes } = await compileSchemaObjectPropertiesAndDiscriminator(schema.properties, schema.discriminator);
    if (registerId) {
        await register({
            id: registerId,
            dependencies: importTypes,
            schema
        });
    }
    return {
        importTypes,
        content: `${docs}${id}${content}`
    };
};
//# sourceMappingURL=discriminator.js.map