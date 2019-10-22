"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
const compile_1 = require("./compile");
const compileSchemaObjectProperties = (properties) => properties.reduce((info, property) => {
    const data = compileSchemaObjectProperty(property);
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
}, {
    importTypes: [],
    content: ""
});
const compileSchemaObjectPropertiesAndDiscriminator = (properties, { propertyName, mapping }) => {
    const { content, importTypes } = properties.reduce((info, property) => {
        if (property.id === propertyName) {
            return info;
        }
        const data = compileSchemaObjectProperty(property);
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
    }, {
        importTypes: [],
        content: ""
    });
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
const compileSchemaObjectProperty = (property) => compile_1.compile(property.schema, `"${property.id}"${property.required ? "" : "?"}:`);
exports.compileSchemaObject = (schema, id) => {
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
    if (schema.discriminator) {
        const { content, importTypes } = compileSchemaObjectPropertiesAndDiscriminator(schema.properties, schema.discriminator);
        return {
            importTypes,
            content: `${docs}${id}${content}`
        };
    }
    else {
        const { content, importTypes } = compileSchemaObjectProperties(schema.properties);
        return {
            importTypes,
            content: `${docs}${id}{${content}}`
        };
    }
};
//# sourceMappingURL=object.js.map