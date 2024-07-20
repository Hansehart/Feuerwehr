const convertSoftHyphen = (title: string) => {
    return title.replace(/&shy;/g, "\u00AD");
  };