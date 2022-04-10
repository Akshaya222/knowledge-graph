var basedate = [
  {
    id: "m-1",
    Title: "Insurance GIG",
    svg: "https://outsourcetm.s3.ap-south-1.amazonaws.com/output1/ins-hex.png",
    imgUrl:
      "https://outsourcetm.s3.ap-south-1.amazonaws.com/output1/ins-hex.png",
    size: 500,
    Type: "Master",
    color: "rgba(119, 1, 216,0.0)",
    strokeColor: "white",
    fontSize: 18,
    img: "master.png",
    height: 40,
    width: 40,
    // "ins-hex.png",
    visible: true,
  },
];
const getAllData = (workflowdata, workflowimpdata, sellerdata, buyerdata) => {
  console.log("-----");
  console.log(workflowdata);

  workflowdata = workflowdata.map(function (x) {
    return { ...{ id: "workflowId" + x["workflowId"], visible: false }, ...x };
  });

  console.log("-----");
  console.log(workflowdata);

  workflowdata = workflowdata.map(function (x) {
    return {
      ...{
        id: "workflowId" + x["workflowId"],
        img: "white-box.png",
        visible: false,
      },
      ...x,
    };
  });
  let wfdata = workflowdata;
  workflowimpdata = workflowimpdata.map(function (x) {
    return {
      ...{
        id: "workflowImplementationId" + x["workflowImplementationId"],
        visible: false,
      },
      ...x,
    };
  });

  sellerdata = sellerdata.map(function (x) {
    let wfimp = workflowimpdata.find((y) => x.workflowImplementation == y.name);
    return {
      ...{
        id: "sellerId" + x["sellerId"],
        visible: false,
        workflowImplementationId:
          "workflowImplementationId" + wfimp.workflowImplementationId,
      },
      ...x,
    };
  });
  buyerdata = buyerdata.map(function (x) {
    let wfimp = workflowimpdata.find((y) => x.workflowImplementation == y.name);
    return {
      ...{
        id: "buyerId" + x["buyerId"],
        visible: false,
        workflowImplementationId:
          "workflowImplementationId" + wfimp.workflowImplementationId,
      },
      ...x,
    };
  });

  var links = [];
  workflowdata.map(function (x) {
    links.push({ source: basedate[0].id, target: x.id });
  });

  workflowimpdata.map(function (x) {
    links.push({
      source: "workflowId" + x.workflowId,
      target: x.id,
      visible: true,
    });
  });

  sellerdata.map(function (x) {
    let wfimp = workflowimpdata.find((y) => x.workflowImplementation == y.name);
    links.push({
      source: "workflowImplementationId" + wfimp.workflowImplementationId,
      target: x.id,
      visible: true,
    });
  });

  buyerdata.map(function (x) {
    let wfimp = workflowimpdata.find((y) => x.workflowImplementation == y.name);
    links.push({
      source: "workflowImplementationId" + wfimp.workflowImplementationId,
      target: x.id,
      visible: true,
    });
  });

  var nodes = basedate.concat(
    workflowdata,
    workflowimpdata,
    sellerdata,
    buyerdata
  );

  workflowdata = { nodes: nodes, links: links };
  console.log("||||");
  console.log("workflowdata................", workflowdata);
  return { workflowdata, wfdata, workflowimpdata, sellerdata, buyerdata };
};
//filterdata function
const filterData = (allNodes, filteredObj) => {
  let workflowdata = allNodes.wfdata;
  let workflowimpdata = allNodes.wfdataImp;
  let sellerdata = allNodes.sellers;
  let buyerdata = allNodes.buyers;

  workflowdata = workflowdata.map(function (x) {
    let wfimp = workflowimpdata.filter((y) => y.workflowId == x.workflowId);
    return {
      ...{
        workflowImplementations: wfimp,
      },
      ...x,
    };
  });
  workflowdata = workflowdata.map((w) => {
    let wfimpLength = w.workflowImplementations.length;
    if (wfimpLength != 0) {
      const returnedArray = w.workflowImplementations.map(function (x) {
        let sellers = sellerdata.filter(
          (y) => y.workflowImplementationId == x.id
        );
        let buyers = buyerdata.filter(
          (y) => y.workflowImplementationId == x.id
        );
        return {
          ...x,
          sellers,
          buyers,
        };
      });
      return { ...w, workflowImplementations: returnedArray };
    } else {
      return { ...w };
    }
  });
  let finalData = workflowdata;
  //workflow name
  if (!filteredObj.names.includes("All")) {
    let wfnames = filteredObj.names;
    finalData = finalData
      .map((w) => {
        let matched = false;
        wfnames.forEach((name) => {
          if (w.title == name) {
            matched = true;
          }
        });
        if (matched) {
          return w;
        }
      })
      .filter(function (element) {
        return element !== undefined;
      });
  }

  // workflow status
  if (filteredObj.wfStatus != "All") {
    finalData = finalData
      .map((w) => {
        let leng = w.workflowImplementations.length;
        if (leng != 0) {
          let ans = w.workflowImplementations
            .map((s) => {
              let matched = false;
              filteredObj.wfStatus.forEach((name) => {
                if (s.status == name) {
                  matched = true;
                }
              });
              if (matched) {
                return s;
              }
            })
            .filter(function (element) {
              return element !== undefined;
            });
          if (ans.length != 0) {
            return { ...w, workflowImplementations: ans };
          }
        }
      })
      .filter(function (element) {
        return element !== undefined;
      });
  }
  //workflow type
  if (!filteredObj.wfType.includes("All")) {
    finalData = finalData
      .map((w) => {
        let matched = false;
        filteredObj.wfType.forEach((t) => {
          if (w.workflowType == t) {
            matched = true;
          }
        });
        if (matched) {
          return w;
        }
      })
      .filter(function (element) {
        return element !== undefined;
      });
  }
  // workflow type completed
  // partner name "Sensible"
  if (!filteredObj.partnerNames.includes("All")) {
    let partnerNames = filteredObj.partnerNames;
    finalData = finalData
      .map((w) => {
        let leng = w.workflowImplementations.length;
        let ans = new Set();
        if (leng != 0) {
          let a = w.workflowImplementations
            .map((wfimp) => {
              let partSel = wfimp.sellers
                .map((s) => {
                  let matched = false;
                  partnerNames.forEach((name) => {
                    if (s.seller == name) {
                      matched = true;
                    }
                  });
                  if (matched) {
                    return s;
                  }
                })
                .filter(function (element) {
                  return element !== undefined;
                });
              let partBuy = wfimp.buyers
                .map((b) => {
                  let matched = false;
                  partnerNames.forEach((name) => {
                    if (b.buyer == name) {
                      matched = true;
                    }
                  });
                  if (matched) {
                    return b;
                  }
                })
                .filter(function (element) {
                  return element !== undefined;
                });
              ans = [...partSel, ...partBuy];
              if (ans.length != 0) {
                return { ...wfimp, buyers: partBuy, sellers: partSel };
              }
            })
            .filter(function (element) {
              return element !== undefined;
            });
          if (a.length != 0) {
            return { ...w, workflowImplementations: a };
          }
        }
      })
      .filter(function (element) {
        return element !== undefined;
      });
  }
  //  lineOfBusiness
  if (!filteredObj.busiType.includes("All")) {
    finalData = finalData
      .map((w) => {
        let leng = w.workflowImplementations.length;
        let ans = new Set();
        if (leng != 0) {
          let a = w.workflowImplementations
            .map((wfimp) => {
              let partSel = wfimp.sellers
                .map((s) => {
                  let matched = false;
                  filteredObj.busiType.forEach((name) => {
                    if (
                      s.lineOfBusiness != null &&
                      s.lineOfBusiness.includes(name)
                    ) {
                      matched = true;
                    }
                  });
                  if (matched) {
                    return s;
                  }
                })
                .filter(function (element) {
                  return element !== undefined;
                });
              let partBuy = wfimp.buyers
                .map((b) => {
                  let matched = false;
                  filteredObj.busiType.forEach((name) => {
                    if (
                      b.lineOfBusiness != null &&
                      b.lineOfBusiness.includes(name)
                    ) {
                      matched = true;
                    }
                  });
                  if (matched) {
                    return b;
                  }
                })
                .filter(function (element) {
                  return element !== undefined;
                });
              ans = [...partSel, ...partBuy];
              if (ans.length != 0) {
                return { ...wfimp, buyers: partBuy, sellers: partSel };
              }
            })
            .filter(function (element) {
              return element !== undefined;
            });
          if (a.length != 0) {
            return { ...w, workflowImplementations: a };
          }
        }
      })
      .filter(function (element) {
        return element !== undefined;
      });
  }
  //lineOfBusinessSubType  busiSubType
  if (!filteredObj.busiSubType.includes("All")) {
    finalData = finalData
      .map((w) => {
        let leng = w.workflowImplementations.length;
        let ans = new Set();
        if (leng != 0) {
          let a = w.workflowImplementations
            .map((wfimp) => {
              let partSel = wfimp.sellers
                .map((s) => {
                  let matched = false;
                  filteredObj.busiSubType.forEach((name) => {
                    if (
                      s.lineOfBusinessSubType != null &&
                      s.lineOfBusinessSubType.includes(name)
                    ) {
                      matched = true;
                    }
                  });
                  if (matched) {
                    return s;
                  }
                })
                .filter(function (element) {
                  return element !== undefined;
                });
              let partBuy = wfimp.buyers
                .map((b) => {
                  let matched = false;
                  filteredObj.busiSubType.forEach((name) => {
                    if (
                      b.lineOfBusinessSubType != null &&
                      b.lineOfBusinessSubType.includes(name)
                    ) {
                      matched = true;
                    }
                  });
                  if (matched) {
                    return b;
                  }
                })
                .filter(function (element) {
                  return element !== undefined;
                });
              ans = [...partSel, ...partBuy];
              if (ans.length != 0) {
                return { ...wfimp, buyers: partBuy, sellers: partSel };
              }
            })
            .filter(function (element) {
              return element !== undefined;
            });
          if (a.length != 0) {
            return { ...w, workflowImplementations: a };
          }
        }
      })
      .filter(function (element) {
        return element !== undefined;
      });
  }
  //valueChain  valueChainType
  if (!filteredObj.valueChainType.includes("All")) {
    finalData = finalData
      .map((w) => {
        let leng = w.workflowImplementations.length;
        let ans = new Set();
        if (leng != 0) {
          let a = w.workflowImplementations
            .map((wfimp) => {
              let partSel = wfimp.sellers
                .map((s) => {
                  let matched = false;
                  filteredObj.valueChainType.forEach((name) => {
                    if (s.valueChain != null && s.valueChain.includes(name)) {
                      matched = true;
                    }
                  });
                  if (matched) {
                    return s;
                  }
                })
                .filter(function (element) {
                  return element !== undefined;
                });
              let partBuy = wfimp.buyers
                .map((b) => {
                  let matched = false;
                  filteredObj.valueChainType.forEach((name) => {
                    if (b.valueChain != null && b.valueChain.includes(name)) {
                      matched = true;
                    }
                  });
                  if (matched) {
                    return b;
                  }
                })
                .filter(function (element) {
                  return element !== undefined;
                });
              ans = [...partSel, ...partBuy];
              if (ans.length != 0) {
                return { ...wfimp, buyers: partBuy, sellers: partSel };
              }
            })
            .filter(function (element) {
              return element !== undefined;
            });
          if (a.length != 0) {
            return { ...w, workflowImplementations: a };
          }
        }
      })
      .filter(function (element) {
        return element !== undefined;
      });
  }
  //valueChainSubType   valueChainSubType
  if (!filteredObj.valueChainSubType.includes("All")) {
    finalData = finalData
      .map((w) => {
        let leng = w.workflowImplementations.length;
        let ans = new Set();
        if (leng != 0) {
          let a = w.workflowImplementations
            .map((wfimp) => {
              let partSel = wfimp.sellers
                .map((s) => {
                  let matched = false;
                  filteredObj.valueChainSubType.forEach((name) => {
                    if (
                      s.valueChainSubType != null &&
                      s.valueChainSubType.includes(name)
                    ) {
                      matched = true;
                    }
                  });
                  if (matched) {
                    return s;
                  }
                })
                .filter(function (element) {
                  return element !== undefined;
                });
              let partBuy = wfimp.buyers
                .map((b) => {
                  let matched = false;
                  filteredObj.valueChainSubType.forEach((name) => {
                    if (
                      b.valueChainSubType != null &&
                      b.valueChainSubType.includes(name)
                    ) {
                      matched = true;
                    }
                  });
                  if (matched) {
                    return b;
                  }
                })
                .filter(function (element) {
                  return element !== undefined;
                });
              ans = [...partSel, ...partBuy];
              if (ans.length != 0) {
                return { ...wfimp, buyers: partBuy, sellers: partSel };
              }
            })
            .filter(function (element) {
              return element !== undefined;
            });
          if (a.length != 0) {
            return { ...w, workflowImplementations: a };
          }
        }
      })
      .filter(function (element) {
        return element !== undefined;
      });
  }
  //companyType
  if (!filteredObj.companyType.includes("All")) {
    finalData = finalData
      .map((w) => {
        let leng = w.workflowImplementations.length;
        let ans = new Set();
        if (leng != 0) {
          let a = w.workflowImplementations
            .map((wfimp) => {
              let partSel = wfimp.sellers
                .map((s) => {
                  let matched = false;
                  filteredObj.companyType.forEach((name) => {
                    if (s.companyType != null && s.companyType.includes(name)) {
                      matched = true;
                    }
                  });
                  if (matched) {
                    return s;
                  }
                })
                .filter(function (element) {
                  return element !== undefined;
                });
              let partBuy = wfimp.buyers
                .map((b) => {
                  let matched = false;
                  filteredObj.companyType.forEach((name) => {
                    if (b.companyType != null && b.companyType.includes(name)) {
                      matched = true;
                    }
                  });
                  if (matched) {
                    return b;
                  }
                })
                .filter(function (element) {
                  return element !== undefined;
                });
              ans = [...partSel, ...partBuy];
              if (ans.length != 0) {
                return { ...wfimp, buyers: partBuy, sellers: partSel };
              }
            })
            .filter(function (element) {
              return element !== undefined;
            });
          if (a.length != 0) {
            return { ...w, workflowImplementations: a };
          }
        }
      })
      .filter(function (element) {
        return element !== undefined;
      });
  }
  //companySubType
  if (!filteredObj.companySubType.includes("All")) {
    finalData = finalData
      .map((w) => {
        let leng = w.workflowImplementations.length;
        let ans = new Set();
        if (leng != 0) {
          let a = w.workflowImplementations
            .map((wfimp) => {
              let partSel = wfimp.sellers
                .map((s) => {
                  let matched = false;
                  filteredObj.companySubType.forEach((name) => {
                    if (
                      s.companySubType != null &&
                      s.companySubType.includes(name)
                    ) {
                      matched = true;
                    }
                  });
                  if (matched) {
                    return s;
                  }
                })
                .filter(function (element) {
                  return element !== undefined;
                });
              let partBuy = wfimp.buyers
                .map((b) => {
                  let matched = false;
                  filteredObj.companySubType.forEach((name) => {
                    if (
                      b.companySubType != null &&
                      b.companySubType.includes(name)
                    ) {
                      matched = true;
                    }
                  });
                  if (matched) {
                    return b;
                  }
                })
                .filter(function (element) {
                  return element !== undefined;
                });
              ans = [...partSel, ...partBuy];
              if (ans.length != 0) {
                return { ...wfimp, buyers: partBuy, sellers: partSel };
              }
            })
            .filter(function (element) {
              return element !== undefined;
            });
          if (a.length != 0) {
            return { ...w, workflowImplementations: a };
          }
        }
      })
      .filter(function (element) {
        return element !== undefined;
      });
  }
  //partner name completed
  //partnership with multiple companies example 3
  // finalData = finalData
  //   .map((w) => {
  //     let leng = w.workflowImplementations.length;
  //     let ans = 0;
  //     if (leng != 0) {
  //       let a = w.workflowImplementations
  //         .map((wfimp) => {
  //           ans += wfimp.sellers.length;
  //           ans += wfimp.buyers.length;
  //           if (ans == 3) {
  //             return { ...wfimp };
  //           }
  //         })
  //         .filter(function (element) {
  //           return element !== undefined;
  //         });
  //       if (a.length != 0) {
  //         return { ...w };
  //       }
  //     }
  //   })
  //   .filter(function (element) {
  //     return element !== undefined;
  //   });
  let newworkflowdata = [];
  let newworkflowimp = [];
  let newsellers = [];
  let newbuyers = [];
  finalData.forEach((w) => {
    newworkflowdata.push(w);
  });
  finalData.forEach((w) => {
    if (w.workflowImplementations.length != 0) {
      w.workflowImplementations.forEach((wfimp) => {
        newworkflowimp.push(wfimp);
      });
    }
  });
  var set1 = new Set(newworkflowimp);
  newworkflowimp = [...set1];
  newworkflowimp.forEach((wfimp) => {
    if (wfimp.sellers.length != 0) {
      wfimp.sellers.forEach((s) => {
        newsellers.push(s);
      });
    }
    if (wfimp.buyers.length != 0) {
      wfimp.buyers.forEach((s) => {
        newbuyers.push(s);
      });
    }
  });
  newworkflowdata = newworkflowdata.map((w) => {
    delete w.workflowImplementations;
    return w;
  });
  newworkflowimp = newworkflowimp.map((w) => {
    delete w.sellers;
    delete w.buyers;
    return w;
  });
  var set2 = new Set(newbuyers);
  newbuyers = [...set2];
  var set3 = new Set(newsellers);
  newsellers = [...set3];
  console.log(
    "newData",
    newworkflowdata,
    newworkflowimp,
    newbuyers,
    newsellers
  );
  return {
    workflowdata: newworkflowdata,
    workflowimpdata: newworkflowimp,
    sellerdata: newsellers,
    buyerdata: newbuyers,
  };
};
export { filterData, getAllData };
