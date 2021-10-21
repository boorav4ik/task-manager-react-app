import React from "react";
import RadioButtons from "../RadioButtonsGroup";
import SubmitGroup from "../SubmitGroup";
import PropTypes from "prop-types";
import { createTaskFieldList } from "../../utils/const";

const Index = ({
    sortField,
    sortDirection,
    handleChange,
    handleCreateTask,
}) => (
    <div className="flex-column content-space-between">
        <div className="flex-column sort-tools">
            <RadioButtons
                label="Sort Field"
                options={["username", "email", "status"]}
                value={sortField}
                onChange={(value) => handleChange({ sortField: value })}
            />
            <RadioButtons
                label="Sort Directions"
                options={["asc", "desc"]}
                value={sortDirection}
                onChange={(value) => handleChange({ sortDirection: value })}
            />
        </div>
        <SubmitGroup
            onSubmitClick={handleCreateTask}
            fieldList={createTaskFieldList}
            className="mb-78"
        >
            Submit
        </SubmitGroup>
    </div>
);

Index.propTypes = {
    sortField: PropTypes.string,
    sortDirection: PropTypes.string,
    handleChange: PropTypes.func,
    handleCreateTask: PropTypes.func,
};
export default Index;
