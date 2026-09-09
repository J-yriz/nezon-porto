export interface IDataJSON {
  id?: number;
  name_project: string;
  type_project: string;
  image_project: string;
}

export interface ISocialLink {
  name: string;
  link: string;
}

export interface IHomeAboutItem {
  title: string;
  body: string[] | ISocialLink[];
}

export interface IHomeExpItem {
  title: string;
  body: string | number;
}

export interface IHomeData {
  about: IHomeAboutItem[];
  exp: IHomeExpItem[];
}

export function isSocialLinks(body: IHomeAboutItem["body"]): body is ISocialLink[] {
  return (
    Array.isArray(body) &&
    body.length > 0 &&
    typeof body[0] === "object" &&
    body[0] !== null &&
    "link" in (body[0] as object)
  );
}
