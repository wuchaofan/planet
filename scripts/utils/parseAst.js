import * as parser from "@babel/parser";

export function parseAst (content) {
    return parser.parse(content, {
        presets: [
            "@babel/preset-env", 
            ["@babel/preset-react",
            {
                "pragma": "dom", // default pragma is React.createElement
                "pragmaFrag": "DomFrag", // default is React.Fragment
                "throwIfNamespace": false // defaults to true
            }
        ]],
        sourceType: 'module',
        plugins: [
            "classProperties",
            "jsx",
        ],
    })
}