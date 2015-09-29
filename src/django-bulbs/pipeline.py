
class PipelineWrapper(object):

    def __init__(self):
        self.name = ""
        self.dict = {
            "source_filenames": (),
            "output_filename": ""
        }

    def set_name(self, name):
        self.name = name
        return self

    def add_source_filename(self, filename):
        self.dict["source_filenames"] += (filename,)
        return self

    def set_output_filename(self, filename):
        self.dict["output_filename"] = filename
        return self

    def update_pipeline(self, pipeline_config):
        pipeline_config.update({self.name: self.dict})
        return self

cms_css = PipelineWrapper()
cms_css \
    .set_name("quiz_cms") \
    .set_output_filename("css/quiz-cms.css") \
    .add_source_filename("cms/quiz/*.less")

public_css = PipelineWrapper()
public_css \
    .set_name("quiz") \
    .set_output_filename("css/quiz.css") \
    .add_source_filename("quiz/styles/quiz.less")

cms_js = PipelineWrapper()
cms_js \
    .set_name("quiz_cms") \
    .set_output_filename("js/quiz-cms.js") \
    .add_source_filename("cms/quiz/*.js")

public_js = PipelineWrapper()
public_js \
    .set_name("quiz") \
    .set_output_filename("js/quiz.js") \
    .add_source_filename("velocity/jquery.velocity.min.js") \
    .add_source_filename("velocity/velocity.ui.min.js") \
    .add_source_filename("quiz/js/quiz.js")
