import recast from "recast";
import { tsxParser } from "./tsx-parser.mjs";

export function extractComponentPropsType({ source }: { source: string }) {
  const ast = recast.parse(source, {
    parser: tsxParser,
  });
  const member = analyzePropsType(ast);
  if (!member) return "";
  return recast.print(member).code;
}

type Member = recast.types.namedTypes.ASTNode;

function analyzePropsType(ast: recast.types.ASTNode): Member | undefined {
  let extractedProps: Member | undefined = undefined;

  recast.types.visit(ast, {
    visitExportDefaultDeclaration(exportDefaultPath) {
      const declaration = exportDefaultPath.node.declaration;

      if (isFunctionDeclaration(declaration)) {
        extractedProps = extractPropsFromFunctionDeclaration(ast, declaration);
      } else if (declaration.type === "Identifier") {
        const exportedName = declaration.name;
        extractedProps = findPropsInDeclarations(ast, exportedName);
      }

      this.traverse(exportDefaultPath);
    },
  });

  return extractedProps;
}

function findPropsInDeclarations(
  ast: recast.types.ASTNode,
  exportedName: string
): Member | undefined {
  let extractedProps: Member | undefined = undefined;

  recast.types.visit(ast, {
    visitVariableDeclaration(variablePath) {
      variablePath.node.declarations.forEach((declarator) => {
        if (
          declarator.type === "VariableDeclarator" &&
          declarator.id.type === "Identifier" &&
          declarator.id.name === exportedName &&
          declarator.init &&
          isFunctionDeclaration(declarator.init)
        ) {
          extractedProps = extractPropsFromFunctionDeclaration(
            ast,
            declarator.init
          );
        }
      });

      this.traverse(variablePath);
    },
    visitFunctionDeclaration(functionPath) {
      if (functionPath.node.id && functionPath.node.id.name === exportedName) {
        extractedProps = extractPropsFromFunctionDeclaration(
          ast,
          functionPath.node
        );
      }

      this.traverse(functionPath);
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
    return extractPropsFromIdentifier(ast, firstParam);
  } else if (firstParam.type === "ObjectPattern") {
    return extractTypeAnnotationFromObjectPattern(firstParam);
  }
}

function extractPropsFromIdentifier(
  ast: recast.types.ASTNode,
  identifier: recast.types.namedTypes.Identifier
): Member | undefined {
  const typeAnnotation = identifier.typeAnnotation?.typeAnnotation;

  if (typeAnnotation?.type === "TSTypeLiteral") {
    return typeAnnotation;
  } else if (
    typeAnnotation?.type === "TSTypeReference" &&
    typeAnnotation.typeName.type === "Identifier"
  ) {
    return findTypeDeclaration(ast, typeAnnotation.typeName.name);
  }
}

function isFunctionDeclaration(
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

function extractTypeAnnotationFromObjectPattern(
  pattern: recast.types.namedTypes.ObjectPattern
): Member | undefined {
  return pattern.typeAnnotation?.typeAnnotation ?? undefined;
}

function findTypeDeclaration(
  ast: recast.types.ASTNode,
  typeName: string
): Member | undefined {
  let foundDeclaration: Member | undefined;

  recast.types.visit(ast, {
    visitTSTypeAliasDeclaration(path) {
      if (path.node.id.name === typeName) {
        foundDeclaration = path.node.typeAnnotation;
      }
      this.traverse(path);
    },
    visitTSInterfaceDeclaration(path) {
      if (
        path.node.id.type === "Identifier" &&
        path.node.id.name === typeName
      ) {
        foundDeclaration = path.node.body;
      }
      this.traverse(path);
    },
  });

  return foundDeclaration;
}
