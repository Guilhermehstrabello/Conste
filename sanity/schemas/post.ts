export default {
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Título",
      type: "string",
      validation: (Rule: any) => Rule.required().min(5).max(120),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "publishedAt",
      title: "Data de publicação",
      type: "datetime",
      options: {
        dateFormat: "DD/MM/YYYY",
        timeFormat: "HH:mm",
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "author",
      title: "Autor",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "excerpt",
      title: "Resumo",
      type: "text",
      rows: 4,
      validation: (Rule: any) => Rule.max(180),
    },
    {
      name: "mainImage",
      title: "Imagem de capa",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "body",
      title: "Conteúdo",
      type: "array",
      of: [{ type: "block" }, { type: "image" }],
    },
    {
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    },
  ],
};
