import ts from "typescript";

export function extractComponentPropsTypeFromFile(
  filePath: string
): string | null {
  const program = ts.createProgram([filePath], {
    lib: ["dom", "dom.iterable", "esnext"],
    allowJs: true,
    skipLibCheck: true,
    strict: true,
    noEmit: true,
    esModuleInterop: true,
    module: ts.ModuleKind.ESNext,
    moduleResolution: ts.ModuleResolutionKind.NodeJs,
    resolveJsonModule: true,
    isolatedModules: true,
    jsx: ts.JsxEmit.Preserve,
    incremental: true,
    plugins: [
      {
        name: "next",
      },
    ],
    paths: {
      "@/*": ["./src/*"],
    },
  });
  const checker = program.getTypeChecker();
  const sourceFile = program.getSourceFile(filePath);

  if (!sourceFile) {
    console.error("Source file not found");
    return null;
  }

  let propsTypeNode: ts.TypeNode | undefined;

  const visit = (node: ts.Node) => {
    // export default function
    if (ts.isExportAssignment(node) && ts.isIdentifier(node.expression)) {
      const symbol = checker.getSymbolAtLocation(node.expression);
      if (symbol) {
        const type = checker.getTypeOfSymbolAtLocation(symbol, node);
        extractFirstParamTypeFromSignatures(type);
      }
    }

    // export default const/let/var
    if (
      ts.isVariableStatement(node) &&
      node.modifiers?.some((mod) => mod.kind === ts.SyntaxKind.ExportKeyword) &&
      node.declarationList.declarations.some((decl) =>
        ts.isIdentifier(decl.name)
      )
    ) {
      node.declarationList.declarations.forEach((decl) => {
        if (ts.isIdentifier(decl.name)) {
          const symbol = checker.getSymbolAtLocation(decl.name);
          if (symbol) {
            const type = checker.getTypeOfSymbolAtLocation(symbol, decl);
            extractFirstParamTypeFromSignatures(type);
          }
        }
      });
    }

    // export default function expression or arrow function
    if (
      ts.isFunctionDeclaration(node) ||
      ts.isFunctionExpression(node) ||
      ts.isArrowFunction(node)
    ) {
      if (node.parameters.length > 0) {
        const param = node.parameters[0];
        if (param.type) {
          propsTypeNode = param.type;
        }
      }
    }

    ts.forEachChild(node, visit);
  };

  const extractFirstParamTypeFromSignatures = (type: ts.Type) => {
    const callSignatures = type.getCallSignatures();
    if (callSignatures.length > 0) {
      const paramType = callSignatures[0].getParameters()[0]?.valueDeclaration;
      if (paramType && ts.isParameter(paramType) && paramType.type) {
        propsTypeNode = paramType.type;
      }
    }
  };

  visit(sourceFile);

  if (propsTypeNode) {
    const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
    const result = printer.printNode(
      ts.EmitHint.Unspecified,
      propsTypeNode,
      sourceFile
    );
    return result;
  }

  return null;
}
