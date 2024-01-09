import React from "react";
import payload from "payload";

export class RenderCellFactory {
  static get(element: unknown, key: string) {
    console.log("key", key);
    if (element[key] == undefined) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
      payload.logger.error(
        `Attribute ${key} cannot be found in element ${element.toString()}`
      );
      return null;
    }

    const isImageUrl = new RegExp("http(s?):\\/\\/.*.(jpg|png|jpeg)$");

    if (Array.isArray(element[key])) {
      if (
        element[key].every((item: string) =>
          isImageUrl.test((item as string).toString())
        )
      ) {
        // If the element is an array, render images accordingly
        const ImagesComponent: React.FC<{ children?: React.ReactNode[] }> = ({
          children,
        }) => (
          <span>
            {children.map((imageUrl: string, index: number) => (
              <img
                key={index}
                src={imageUrl}
                alt={`image ${index + 1}`}
                style={{ paddingTop: 10, paddingBottom: 10 }}
              />
            ))}
          </span>
        );
        const ImagesComponentCell = (row, data) => (
          <ImagesComponent>{data}</ImagesComponent>
        );
        return ImagesComponentCell;
      } else {
        // If the element is an array of strings, render them
        const StringsComponent: React.FC<{ children?: React.ReactNode[] }> = ({
          children,
        }) => (
          <span>
            {children.map((text: string, index: number) => (
              <span key={index}>
                {index > 0 && ", "} {text}
              </span>
            ))}
          </span>
        );
        const StringsComponentCell = (row, data) => (
          <StringsComponent>{data}</StringsComponent>
        );
        return StringsComponentCell;
      }
    }

    if (isImageUrl.test((element[key] as string).toString())) {
      const ImageComponent: React.FC<{ children?: React.ReactNode }> = ({
        children,
      }) => (
        <span>
          <img src={children.toString()} alt="image of object" />
        </span>
      );
      const ImageComponentCell = (row, data) => (
        <ImageComponent>{data}</ImageComponent>
      );
      return ImageComponentCell;
    }

    if (typeof element[key] == "object") {
      const DateComponent: React.FC<{ children?: React.ReactNode }> = ({
        children,
      }) => <span>{(children as unknown as Date).toDateString()}</span>;
      const DateComponentCell = (row, data) => (
        <DateComponent>{data}</DateComponent>
      );
      return DateComponentCell;
    }

    if (typeof element[key] === "boolean") {
      // If the element is a boolean, render "Yes" or "No"
      const BooleanComponent: React.FC<{ children?: React.ReactNode }> = ({
        children,
      }) => <span>{children ? "Yes" : "No"}</span>;
      const BooleanComponentCell = (row, data) => (
        <BooleanComponent>{data}</BooleanComponent>
      );
      return BooleanComponentCell;
    }

    const TextComponent: React.FC<{ children?: React.ReactNode }> = ({
      children,
    }) => <span>{children}</span>;
    const TextComponentCell = (row, data) => (
      <TextComponent>{data}</TextComponent>
    );
    return TextComponentCell;
  }
}
