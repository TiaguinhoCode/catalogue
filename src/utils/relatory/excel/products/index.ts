// Bibliotecas
import ExcelJS from "exceljs";

// Utils
import { formatCurrency } from "./../../../mask/money/index";
import { formatDate } from "@/utils/mask/formDate";

// Tipagem
import { ItemsProducts } from "@/types/products";

const exportToExcel = async (data: ItemsProducts[], fileName: string) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Relatório");

  worksheet.columns = [
    { header: "Nome", key: "name", width: 30 },
    { header: "Descrição", key: "description", width: 30 },
    { header: "Categoria", key: "categories", width: 30 },
    { header: "Ativo?", key: "active", width: 20 },
    { header: "Valor Sem Desconto", key: "price", width: 30 },
    { header: "Promoção?", key: "promotion", width: 20 },
    {
      header: "Porcentagem do Desconto",
      key: "percentage",
      width: 30,
      style: { numFmt: "0.00%" },
    },
    { header: "Valor Com Desconto", key: "discountPercentage", width: 30 },
    { header: "Data Da Criação", key: "createAt", width: 30 },
    { header: "Data Da Última Alteração", key: "updatedAt", width: 30 },
  ];

  const formattedData = data.map((product) => ({
    name: product.name,
    description: product.description,
    categories: product.category.name,
    active: product.is_active ? "Sim" : "Não",
    price: formatCurrency(product.price),
    promotion: product.promotion ? "Sim" : "Não",
    percentage: product.discount_percentage
      ? Number(product.discount_percentage) / 100
      : 0,
    discountPercentage: product.discount_price
      ? formatCurrency(product.discount_price)
      : "R$ 0,00",
    createAt: formatDate(product.created_at),
    updatedAt: formatDate(product.updated_at),
  }));

  worksheet.addRows(formattedData);

  worksheet.views = [{ state: "frozen", ySplit: 1 }];

  worksheet.getRow(1).eachCell((cell) => {
    cell.font = { bold: true, color: { argb: "FFFFFF" } };
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "0070C0" }, // Azul claro
    };
    cell.alignment = { vertical: "middle", horizontal: "center" };
    cell.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };
  });

  worksheet.eachRow((row, rowNumber) => {
    if (rowNumber !== 1) {
      row.eachCell((cell) => {
        cell.alignment = { vertical: "middle", horizontal: "left" };
        cell.border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
      });
    }
  });

  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `${fileName}.xlsx`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export default exportToExcel;
