
export interface NotionDB {
  object:           string;
  id:               string;
  cover:            null;
  icon:             Icon;
  created_time:     string;
  created_by:       User;
  last_edited_by:   User;
  last_edited_time: string;
  title:            Title[];
  description:      any[];
  is_inline:        boolean;
  properties:       Properties;
  parent:           Parent;
  url:              string;
  archived:         boolean;
}

export interface User {
  object: string;
  id:     string;
}

export interface Icon {
  type:  string;
  emoji: string;
}

export interface Parent {
  type:    string;
  page_id: string;
}

export interface Properties {
  Tags:        Description;
  Description: Description;
  URL:         Description;
  Domains:     Description;
  ID:          Description;
  Name:        Description;
}

export interface Description {
  id:            string;
  name:          string;
  type:          string;
  rich_text?:    RichText;
  multi_select?: MultiSelect;
  formula?:      Formula;
  title?:        RichText;
  url?:          RichText;
}

export interface Formula {
  expression: string;
}

export interface MultiSelect {
  options: Option[];
}

export interface Option {
  id:    string;
  name:  string;
  color: string;
}

export interface RichText {
}

export interface Title {
  type:        string;
  text:        Text;
  annotations: Annotations;
  plain_text:  string;
  href:        null;
}

export interface Annotations {
  bold:          boolean;
  italic:        boolean;
  strikethrough: boolean;
  underline:     boolean;
  code:          boolean;
  color:         string;
}

export interface Text {
  content: string;
  link:    null;
}
