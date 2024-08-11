import recast from "recast";
import { tsxParser } from "./tsx-parser.mjs";

export function extractComponentPropsType({ source }: { source: string }) {
  const ast = recast.parse(source, {
    parser: tsxParser,
  });
  const member = analyzePropsType(ast);
  if (!member) return "";
  const memberSource = recast.print(member).code;
  return memberSource;
}

type Member = recast.types.namedTypes.ASTNode;

function analyzePropsType(ast: recast.types.ASTNode): Member | undefined {
  let extractedProps: Member | undefined = undefined;
  recast.types.visit(ast, {
    visitExportDefaultDeclaration(exportDefaultPath) {
      const declaration = exportDefaultPath.node.declaration;
      if (isFunctionDelcaration(declaration) && declaration.params?.[0]) {
        const firstParam = declaration.params[0];

        if (firstParam.type === "Identifier") {
          extractedProps = extractPropsFromFunctionDeclaration(
            ast,
            declaration
          );
        } else if (firstParam.type === "ObjectPattern") {
          const typeAnnotation =
            extractTypeAnnotationFromObjectPattern(firstParam);

          if (typeAnnotation?.type === "TSTypeLiteral") {
            extractedProps = typeAnnotation;
          }
        }
      } else if (declaration.type === "Identifier") {
        const exportedName = declaration.name;
        recast.types.visit(ast, {
          visitVariableDeclaration(varaiblePath) {
            varaiblePath.node.declarations.find((declaration) => {
              if (
                declaration.type === "VariableDeclarator" &&
                declaration.id.type === "Identifier" &&
                declaration.id.name === exportedName &&
                declaration.init &&
                isFunctionDelcaration(declaration.init)
              ) {
                extractedProps = extractPropsFromFunctionDeclaration(
                  ast,
                  declaration.init
                );
              }
            });
          },
          visitFunctionDeclaration(functionPath) {
            extractedProps = extractPropsFromFunctionDeclaration(
              ast,
              functionPath.node
            );
            this.traverse(functionPath);
          },
        });
      }

      this.traverse(exportDefaultPath);
    },
  });
  return extractedProps;
}

function extractPropsFromFunctionDeclaration(
  ast: recast.types.ASTNode,
  declaration:
    | recast.types.namedTypes.FunctionDeclaration
    | recast.types.namedTypes.ArrowFunctionExpression
    | recast.types.namedTypes.FunctionExpression
): Member | undefined {
  const firstParam = declaration.params[0];

  if (firstParam.type === "Identifier") {
    const typeAnnotation = extractTypeAnnotationFromFunction(declaration);
    if (typeAnnotation?.type === "TSTypeLiteral") {
      return typeAnnotation;
    } else if (
      typeAnnotation?.type === "TSTypeReference" &&
      typeAnnotation.typeName.type === "Identifier"
    ) {
      const typeDeclaration = findTypeDeclaration(
        ast,
        typeAnnotation.typeName.name
      );
      if (typeDeclaration) {
        if (
          typeDeclaration.type === "TSTypeAliasDeclaration" &&
          typeDeclaration.typeAnnotation.type === "TSTypeLiteral"
        ) {
          return typeDeclaration.typeAnnotation;
        } else if (typeDeclaration.type === "TSInterfaceDeclaration") {
          return typeDeclaration.body;
        }
      }
    }
  }
}

function isFunctionDelcaration(
  declaration:
    | recast.types.namedTypes.Declaration
    | recast.types.namedTypes.Expression
): declaration is
  | recast.types.namedTypes.FunctionDeclaration
  | recast.types.namedTypes.ArrowFunctionExpression
  | recast.types.namedTypes.FunctionExpression {
  return (
    declaration.type === "FunctionDeclaration" ||
    declaration.type === "ArrowFunctionExpression" ||
    declaration.type === "FunctionExpression"
  );
}

function extractTypeAnnotationFromFunction(
  declaration:
    | recast.types.namedTypes.FunctionDeclaration
    | recast.types.namedTypes.ArrowFunctionExpression
    | recast.types.namedTypes.FunctionExpression
) {
  if (
    !declaration.params?.[0] ||
    declaration.params?.[0].type !== "Identifier"
  ) {
    return;
  }
  const [props] = declaration.params;
  if (props.type == "Identifier" && props.typeAnnotation?.typeAnnotation) {
    return props.typeAnnotation.typeAnnotation;
  }
}

function extractTypeAnnotationFromObjectPattern(
  pattern: recast.types.namedTypes.ObjectPattern
) {
  if (pattern.typeAnnotation?.typeAnnotation) {
    return pattern.typeAnnotation.typeAnnotation;
  }
}

function findTypeDeclaration(
  ast: recast.types.ASTNode,
  typeName: string
):
  | recast.types.namedTypes.TSTypeAliasDeclaration
  | recast.types.namedTypes.TSInterfaceDeclaration
  | undefined {
  let foundDeclaration;
  recast.types.visit(ast, {
    visitTSTypeAliasDeclaration(path) {
      if (path.node.id.name === typeName) {
        foundDeclaration = path.node;
      }
      this.traverse(path);
    },
    visitTSInterfaceDeclaration(path) {
      if (
        path.node.id.type === "Identifier" &&
        path.node.id.name === typeName
      ) {
        foundDeclaration = path.node;
      }
      this.traverse(path);
    },
  });
  return foundDeclaration;
}
