export class dataBase {

  linksArray:any;

  constructor(){

    this.linksArray=[
      {sourceType: "object1", targetType1: "object2",targetType2: "null", linkName: "Uni-direct(null tag)"},
      {sourceType: "object1", targetType1: "object2.1", targetType2: "object2.2", linkName: "Uni-direct(null tag)"},
      {sourceType: "object1", targetType1: "object2.1", targetType2: "object2.n", linkName: "Uni-direct(null tag)"},
      {sourceType: "process1", targetType1: "process2",targetType2: "null", linkName: "Uni-direct(null tag)"},
      {sourceType: "object1.state", targetType1: "object2",targetType2: "null", linkName: "Uni-direct(null tag)"},
      {sourceType: "object1", targetType1: "object2.state",targetType2: "null", linkName: "Uni-direct(null tag)"},
      {sourceType: "object1.state1", targetType1: "object2.state2",targetType2: "null", linkName: "Uni-direct(null tag)"},

      {sourceType: "object1", targetType1: "object2.1", targetType2: "object2.2", linkName: "Uni-direct(tag)"},
      {sourceType: "object1", targetType1: "object2.1", targetType2: "object2.n", linkName: "Uni-direct(tag)"},
      {sourceType: "process1", targetType1: "process2",targetType2: "null", linkName: "Uni-direct(tag)"},
      {sourceType: "object1.state", targetType1: "object2",targetType2: "null", linkName: "Uni-direct(tag)"},
      {sourceType: "object1", targetType1: "object2.state",targetType2: "null", linkName: "Uni-direct(tag)"},
      {sourceType: "object1.state1", targetType1: "object2.state2",targetType2: "null", linkName: "Uni-direct(tag)"},

      {sourceType: "object1", targetType1: "object2",targetType2: "null", linkName: "Bi-direct(null tag)"},
      {sourceType: "process1", targetType1: "process2",targetType2: "null", linkName: "Bi-direct(null tag)"},
      {sourceType: "object1.state", targetType1: "object2",targetType2: "null", linkName: "Bi-direct(null tag)"},
      {sourceType: "object1", targetType1: "object2.state",targetType2: "null", linkName: "Bi-direct(null tag)"},
      {sourceType: "object1.state1", targetType1: "object2.state2",targetType2: "null", linkName: "Bi-direct(null tag)"},

      {sourceType: "object1", targetType1: "object2",targetType2: "null", linkName: "Bi-direct(tag)"},
      {sourceType: "process1", targetType1: "process2",targetType2: "null", linkName: "Bi-direct(tag)"},
      {sourceType: "object1.state", targetType1: "object2",targetType2: "null", linkName: "Bi-direct(tag)"},
      {sourceType: "object1", targetType1: "object2.state",targetType2: "null", linkName: "Bi-direct(tag)"},
      {sourceType: "object1.state1", targetType1: "object2.state2",targetType2: "null", linkName: "Bi-direct(tag)"},

      {sourceType: "object1", targetType1: "object2",targetType2: "null", linkName: "Bi-direct(ftag, btag)"},
      {sourceType: "process1", targetType1: "process2",targetType2: "null", linkName: "Bi-direct(ftag, btag)"},
      {sourceType: "object1.state", targetType1: "object2",targetType2: "null", linkName: "Bi-direct(ftag, btag)"},
      {sourceType: "object1", targetType1: "object2.state",targetType2: "null", linkName: "Bi-direct(ftag, btag)"},
      {sourceType: "object1.state1", targetType1: "object2.state2",targetType2: "null", linkName: "Bi-direct(ftag, btag)"},

      {sourceType: "object1", targetType1: "object2",targetType2: "null", linkName: "Aggregation-Participation"},
      {sourceType: "object1", targetType1: "object2.1", targetType2: "object2.2", linkName: "Aggregation-Participation"},
      {sourceType: "object1", targetType1: "object2.1", targetType2: "object2.n", linkName: "Aggregation-Participation"},
      {sourceType: "process1", targetType1: "process2",targetType2: "null", linkName: "Aggregation-Participation"},

      {sourceType: "object1", targetType1: "object2",targetType2: "null", linkName: "Exhibition-Characterization"},
      {sourceType: "object1", targetType1: "object2.1", targetType2: "object2.2", linkName: "Exhibition-Characterization"},
      {sourceType: "object1", targetType1: "object2.1", targetType2: "object2.n", linkName: "Exhibition-Characterization"},
      {sourceType: "object1", targetType1: "process2",targetType2: "null", linkName: "Exhibition-Characterization"},
      {sourceType: "process1", targetType1: "object2",targetType2: "null", linkName: "Exhibition-Characterization"},
      {sourceType: "process1", targetType1: "process2",targetType2: "null", linkName: "Exhibition-Characterization"},
      {sourceType: "object1.state", targetType1: "object2",targetType2: "null", linkName: "Exhibition-Characterization"},
      {sourceType: "object1", targetType1: "object2.state",targetType2: "null", linkName: "Exhibition-Characterization"},
      {sourceType: "object1.state", targetType1: "process2",targetType2: "null", linkName: "Exhibition-Characterization"},
      {sourceType: "process1", targetType1: "object2.state",targetType2: "null", linkName: "Exhibition-Characterization"},

      {sourceType: "object1", targetType1: "object2",targetType2: "null", linkName: "Generalization-Specialization"},
      {sourceType: "object1", targetType1: "object2.1", targetType2: "object2.2", linkName: "Generalization-Specialization"},
      {sourceType: "object1", targetType1: "object2.1", targetType2: "object2.n", linkName: "Generalization-Specialization"},
      {sourceType: "process1", targetType1: "process2",targetType2: "null", linkName: "Generalization-Specialization"},

      {sourceType: "object1", targetType1: "object2",targetType2: "null", linkName: "Classification-Instantiation"},
      {sourceType: "object1", targetType1: "object2.1", targetType2: "object2.2", linkName: "Classification-Instantiation"},
      {sourceType: "object1", targetType1: "object2.1", targetType2: "object2.n", linkName: "Classification-Instantiation"},
      {sourceType: "process1", targetType1: "process2",targetType2: "null", linkName: "Classification-Instantiation"},

      {sourceType: "process1", targetType1: "object2",targetType2: "null", linkName: "Result"},
      {sourceType: "process1", targetType1: "object2.state",targetType2: "null", linkName: "Result"},

      {sourceType: "object1", targetType1: "process2",targetType2: "null", linkName: "Consumption"},
      {sourceType: "object1.state", targetType1: "process2",targetType2: "null", linkName: "Consumption"},

      {sourceType: "process1", targetType1: "object2",targetType2: "null", linkName: "Effect"},

      {sourceType: "object1", targetType1: "process2",targetType2: "null", linkName: "Agent"},
      {sourceType: "object1.state", targetType1: "process2",targetType2: "null", linkName: "Agent"},

      {sourceType: "object1", targetType1: "process2",targetType2: "null", linkName: "Instrument"},
      {sourceType: "object1.state", targetType1: "process2",targetType2: "null", linkName: "Instrument"},

      {sourceType: "object1.state1", targetType1: "object1.state2",targetType2: "null", linkName: "In-out link pair"},
      {sourceType: "object1.state", targetType1: "object1",targetType2: "null", linkName: "In-out link pair"},
      {sourceType: "object1", targetType1: "object1.state",targetType2: "null", linkName: "In-out link pair"},

      {sourceType: "object1.state", targetType1: "process2",targetType2: "null", linkName: "Split input"},

      {sourceType: "process1", targetType1: "object2.state",targetType2: "null", linkName: "Split output"},

      {sourceType: "process1", targetType1: "process2",targetType2: "null", linkName: "Invocation"},
      {sourceType: "process1", targetType1: "process1",targetType2: "null", linkName: "Invocation"},

      {sourceType: "process1", targetType1: "process2",targetType2: "null", linkName: "Overtime exeption"},
      {sourceType: "object1.state", targetType1: "process2",targetType2: "null", linkName: "Overtime exeption"},
      {sourceType: "object1.state1", targetType1: "object1.state2",targetType2: "null", linkName: "Overtime exeption"},
      {sourceType: "object1.state", targetType1: "object1",targetType2: "null", linkName: "Overtime exeption"},

      {sourceType: "process1", targetType1: "process2",targetType2: "null", linkName: "Undertime exeption"},

      {sourceType: "process1", targetType1: "process2",targetType2: "null", linkName: "Undertime and overtime exeption"},

      {sourceType: "object1", targetType1: "process2",targetType2: "null", linkName: "Condition Consumption"},
      {sourceType: "object1.state", targetType1: "process2",targetType2: "null", linkName: "Condition Consumption"},

      {sourceType: "object1", targetType1: "process2",targetType2: "null", linkName: "Condition Effect"},

      {sourceType: "object1.state1", targetType1: "object1.state2",targetType2: "null", linkName: "Condition Input"},
      {sourceType: "object1.state", targetType1: "object1",targetType2: "null", linkName: "Condition Input"},
      {sourceType: "object1", targetType1: "object1.state",targetType2: "null", linkName: "Condition Input"},

      {sourceType: "object1", targetType1: "process2",targetType2: "null", linkName: "Condition Instrument"},
      {sourceType: "object1.state", targetType1: "process2",targetType2: "null", linkName: "Condition Instrument"},

      {sourceType: "object1", targetType1: "process2",targetType2: "null", linkName: "Condition Agent"},
      {sourceType: "object1.state", targetType1: "process2",targetType2: "null", linkName: "Condition Agent"},

      {sourceType: "object1", targetType1: "process2",targetType2: "null", linkName: "Event Consuption"},
      {sourceType: "object1.state", targetType1: "process2",targetType2: "null", linkName: "Event Consuption"},

      {sourceType: "object1", targetType1: "process2",targetType2: "null", linkName: "Event Effect"},

      {sourceType: "object1", targetType1: "process2",targetType2: "null", linkName: "Event Instrument"},

      {sourceType: "object1", targetType1: "process2",targetType2: "null", linkName: "Event Agent"}
    ];
  }
}
