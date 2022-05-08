import { EditCellComponent } from "./edit-cell.component";

describe('EditCellComponent', () => {
  let component: EditCellComponent;

  beforeEach(() => {
    component = new EditCellComponent();
  });

  it('should initialize dataChange', () => {
    expect(component.dataChange).toBeDefined();
  });

  it('should update and emit event', () => {
    let dataChangeCalled = false;
    component.dataChange.subscribe(() => dataChangeCalled = true);
    component.data = {
      config: { id: 'edit', title: 'EditTest', cellComponent: EditCellComponent },
      model: { edit: 'Empty' }
    };

    component.updateAndPropagate('New value');

    expect(component.getCellValue()).toEqual('New value');
    expect(dataChangeCalled).toBeTrue();
  });

  it('should not update and emit without model', () => {
    let dataChangeCalled = false;
    component.dataChange.subscribe(() => dataChangeCalled = true);
    component.data = {
      config: { id: 'edit', title: 'EditTest', cellComponent: EditCellComponent },
      model: undefined
    };

    component.updateAndPropagate('New value');

    expect(component.getCellValue()).toBeUndefined();
    expect(dataChangeCalled).toBeFalse();
  });

  it('should not update and emit without data', () => {
    let dataChangeCalled = false;
    component.dataChange.subscribe(() => dataChangeCalled = true);
    component.data = undefined;

    component.updateAndPropagate('New value');

    expect(component.getCellValue()).toBeUndefined();
    expect(dataChangeCalled).toBeFalse();
  });
});
